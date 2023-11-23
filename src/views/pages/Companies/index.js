import React, {useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import {
    getCompanies,
    getLoadingCompanies,
    getCompaniesPagesCount,

    searchCompanies
} from '../../../redux/company'
import { 
    getPaginatedDataForCurrentPage,
    PageSizes
} from '../../../networking'
import { PageContainer } from '../../components/common/PageContainer'
import { BodyContainer } from '../../components/common/BodyContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { Subheader } from '../../components/headers/Subheader'
import { SearchableTable } from '../../components/common/SearchableTable'

export const CompaniesComponent = props => {
    const {
        
    } = props
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState('')

    const headers = ['Name']
    const rows = !props.loadingCompanies ?
        getPaginatedDataForCurrentPage(props.companies, page, PageSizes.companySearch).map(({name, _id}) =>({
            id: _id,
            cells: [name]
        })) : []

    // Utils

    const fetchFirstPage = () => {
        props.searchCompanies(searchText, page)
        setPage(1)
    }

    // Direct

    const onChangeSearchText = e => {
        setSearchText(e.target.value)
    }

    const onSubmitSearch = e => {
        e.preventDefault()
        fetchFirstPage()
    }

    const onClickTableRow = rowID => {
        navigate(`/companies/${rowID}`)
    }

    const onClickDecrementPage = () => {
        if (page == 1) return
        else {
            setPage(curr => curr - 1)
        }
    }

    const onClickIncrementPage = () => {
        if (page == props.companiesPagesCount || props.companiesPagesCount == 0) return
        else {
            props.searchCompanies(searchText, page + 1)
            setPage(curr => curr + 1)
        }
    }

    return (
        <PageContainer>
            <MainHeader />
            <Subheader title='Companies' />
            <BodyContainer>
                <Root>
                <SearchableTable
                    loading={props.loadingCompanies}
                    searchText={searchText}
                    onChangeSearchText={onChangeSearchText}
                    tableHeaders={headers}
                    tableRows={rows}
                    page={page}
                    pagesCount={props.companiesPagesCount}
                    onSubmitSearch={onSubmitSearch}
                    onClickTableRow={onClickTableRow}
                    onClickDecrementPage={onClickDecrementPage}
                    onClickIncrementPage={onClickIncrementPage}
                />
                </Root>
            </BodyContainer>
        </PageContainer>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
`
const mapStateToProps = state => ({
    companies: getCompanies(state),
    loadingCompanies: getLoadingCompanies(state),
    companiesPagesCount: getCompaniesPagesCount(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    searchCompanies,
}, dispatch)

export const Companies = connect(mapStateToProps, mapDispatchToProps)(CompaniesComponent)