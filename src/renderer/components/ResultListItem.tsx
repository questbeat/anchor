import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import scrollIntoView from 'scroll-into-view-if-needed'
import styled, { css } from 'styled-components'
import { Item, ItemType } from '../../common/types'

const getFavIconUrl = (item: Item) => {
  if (item.type === ItemType.Tab && item.favIconUrl) {
    if (item.favIconUrl.startsWith('chrome://theme/')) {
      return 'chrome://favicon'
    }
    return item.favIconUrl
  }
  return `chrome://favicon/${item.url}`
}

const ItemLeft = styled.div`
  width: 30px;
  min-width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ItemRight = styled.div`
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
`

const ItemImage = styled.img`
  width: 24px;
  height: 24px;
`

const ItemTitle = styled.div`
  color: #333333;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
`

const ItemUrl = styled.div`
  color: #9999aa;
  margin-top: 2px;
  color: #9999aa;
  font-size: 13px;
  font-weight: lighter;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
`

const ItemContainer = styled.li<{ selected: boolean }>`
  width: 100%;
  height: 46px;
  padding: 3px;
  margin-bottom: 2px;
  overflow: hidden;
  display: flex;
  flex-direction: row;

  ${(props) =>
    props.selected &&
    css`
      background-color: #0067ff;

      ${ItemTitle} {
        color: #fafafa;
      }

      ${ItemUrl} {
        color: #bcd5fb;
      }
    `}
`

interface ResultListItemProps {
  index: number
  item: Item
  onClick: (index: number) => void
  selected: boolean
}

export const ResultListItem: React.FC<ResultListItemProps> = ({
  index,
  item,
  onClick,
  selected,
}) => {
  const listItemContainerRef = useRef<HTMLLIElement>(null)

  const handleClick = useCallback(() => onClick(index), [index, onClick])

  useEffect(() => {
    if (selected && listItemContainerRef?.current) {
      scrollIntoView(listItemContainerRef?.current, {
        block: 'nearest',
        inline: 'nearest',
        scrollMode: 'if-needed',
      })
    }
  }, [selected])

  return useMemo(
    () => (
      <ItemContainer
        onClick={handleClick}
        ref={listItemContainerRef}
        selected={selected}
      >
        <ItemLeft>
          <ItemImage src={getFavIconUrl(item)} />
        </ItemLeft>
        <ItemRight>
          <ItemTitle>{item.title}</ItemTitle>
          <ItemUrl>{item.url}</ItemUrl>
        </ItemRight>
      </ItemContainer>
    ),
    [handleClick, item, selected]
  )
}