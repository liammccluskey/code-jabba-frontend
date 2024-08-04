import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { getIsMobile } from '../../../../redux/theme'
import { SearchBar } from '../SearchBar'
import { Pill } from '../Pill'
import { Table } from '../Table'
import { Loading } from '../Loading'
import { Paginator } from '../Paginator'

export const SearchableTableComponent = props => {
    const {
        searchText,
        loading,
        pills=[], // [{title, id, active}]
        sortFilters=[], // [{title, filter}]
        sortFilter,
        tableHeaders, // [string]
        tableRows, // [{id, cells}]
        tableSelectActions=[], // [{title, action}]
        clearSelectedRows,
        page,
        pagesCount,
        searchable=true,
        paginated=true,

        onChangeSearchText, // e => void
        onSubmitSearch,
        onClickPill, // pillID => void
        onChangeSortFilter, // e => void
        onClickTableRow, // rowID => void
        onClickDecrementPage,
        onClickIncrementPage,
        
        ...rest
    } = props

    return (
        <Root {...rest} className={`searchable-table ${props.isMobile && 'mobile'}`}>
            {searchable ?
                <SearchBar
                    value={searchText}
                    placeholder='Search by title'
                    onChange={onChangeSearchText}
                    onSubmit={onSubmitSearch}
                    className='search-bar'
                />
                : null
            }
            <div className='filters-row-container'>
                <div className='pills-container'>
                    {pills.map(({title, id, active}) => (
                        <Pill
                            title={title}
                            id={id}
                            active={active}
                            onClick={onClickPill}
                            key={id}
                        />
                    ))}
                </div>
                {sortFilters.length ?
                    <select value={sortFilter} onChange={onChangeSortFilter}>
                        {sortFilters.map(({title, filter}) => (
                            <option value={filter} key={filter}>{title}</option>
                        ))}
                    </select>
                    : null
                }
            </div>
            {loading ?
                <Loading style={{height: 'auto', margin: '20px 0px'}}/>
                : <div className='d-flex fd-column ai-stretch'>
                    <Table
                        headers={tableHeaders}
                        rows={tableRows}
                        onClickRow={onClickTableRow}
                        selectActions={tableSelectActions}
                        clearSelectedRows={clearSelectedRows}
                        className='float-container'
                    />
                    {paginated ?
                        <Paginator
                            page={page}
                            pagesCount={pagesCount}
                            onClickDecrementPage={onClickDecrementPage}
                            onClickIncrementPage={onClickIncrementPage}
                            className='paginator'
                        />
                        : null
                    }
                </div>
            }
        </Root>
    )
}

const Root = styled.div`
    & select {
        padding-top: 5px !important;
        padding-bottom: 5px !important;
        background-color: transparent !important;
        border: 1px solid ${p => p.theme.bc} !important;
        margin-top: 0px !important;
    }

    & .search-bar {
        width: 310px;
        margin-bottom: 15px;
    }
    &.mobile .search-bar {
        width: 100% !important;
    }

    & .filters-row-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    & .pills-container {
        display: flex;
        align-items: center;
        overflow: scroll;
    }
    & .pills-container::-webkit-scrollbar {
        display: none !important;
    }
    & .pills-container {
        -ms-overflow-style: none !important;
        scrollbar-width: none !important;
    }
    & .pills-container {
        scroll-behavior: smooth;
    }
    & .pills-container div {
        margin-right: 10px;
    }
    & .pills-container div:last-child {
        margin-right: none;
    }

    & .paginator {
        align-self: center;
        margin-top: 25px;
    }
`
const mapStateToProps = state => ({
    isMobile: getIsMobile(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch)

export const SearchableTable = connect(mapStateToProps, mapDispatchToProps)(SearchableTableComponent)