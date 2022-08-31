import { useCallback, useEffect, useState } from 'react'

import { getCategories } from '@api/fetchApi'
import searchIcon from '@assets/img/svg/search-normal.svg'
import { Button } from '@components/Button'
import Input from '@components/Input'
import { MultiDropdown, Option } from '@components/MultiDropdown'
import { useProductContext } from '@context/ProductContext'
import { IProduct } from '@myTypes/product'
import ProductStore from '@store/ProductStore'
import { useLocalStore } from '@utils/useLocalStore'

import styles from './Search.module.scss'

const Search = () => {
  const { getProducts, getProductsByCategory, toggleHasMore, searchProduct } =
    useLocalStore(() => new ProductStore())

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [categories, setCategories] = useState<Option[]>([])
  const [selectedCategories, setSelectedCategories] = useState<Option | null>(
    null
  )

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (selectedCategories !== null) {
      getProductsByCategory(selectedCategories.value)
    } else {
      getProducts()
    }
  }, [selectedCategories])

  const fetchCategories = useCallback(async () => {
    const response = await getCategories()
    const newCategories = response.data.map((element: string) => {
      var id = element + Math.random().toString(16).slice(2)
      const newItem = {
        key: id,
        value: element,
      }
      return newItem
    })
    setCategories(newCategories)
  }, [])

  const switchCategory = useCallback(
    (value: Option) => {
      if (value.key !== selectedCategories?.key) {
        setSelectedCategories(value)
      } else {
        setSelectedCategories(null)
      }
    },
    [selectedCategories?.key]
  )

  const onChange = (value: string) => {
    setSearchTerm(value)
    if (!value) {
      toggleHasMore(true)
      getProducts()
    } else {
      toggleHasMore(false)
    }
  }

  return (
    <div className={styles['search']}>
      <div className={styles['search-controlls']}>
        <img
          className={styles['search-controlls__icon']}
          src={searchIcon}
          alt="search"
        />
        <Input
          onChange={(value: string) => onChange(value)}
          className={styles['search-controlls__input']}
          value={searchTerm}
          type="search"
          placeholder="Search property"
        />
        <Button
          className={styles['search-controlls__button']}
          onClick={() => searchProduct(searchTerm)}
        >
          Find Now
        </Button>
      </div>
      <MultiDropdown
        options={categories}
        value={selectedCategories}
        onChange={(value: Option) => switchCategory(value)}
        pluralizeOptions={(value: Option | null) =>
          value === null ? ` Filter` : `${value.value}`
        }
      />
    </div>
  )
}

export default Search
