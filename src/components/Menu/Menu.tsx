import  { useState } from 'react'
import styles from 'components/Menu/Menu.module.scss'
import Input from 'components/ui-kit/Input'
import MultiDropdown  from 'components/ui-kit/MultiDropdown'
import type {Option} from 'components/ui-kit/MultiDropdown'
import Button from 'components/ui-kit/Button'
import Text from 'components/ui-kit/Text'
import { useGetAllProducts } from '../../hooks/useGetAllProducts'
const Menu = () => {
    const [value, setValue] = useState('')
   const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
   const {total} = useGetAllProducts()
   const options: Option[] = [
    {key: '1', value: 'sjot'},
   ]
  return (
    <div className={styles.menu}>
        <div className={styles.inputBox}>
            <Input  value={value} onChange={(v) => setValue(v)} placeholder='Search product'></Input>
            <Button className={styles.btn}>Find now</Button> 

        </div>
        <MultiDropdown className={styles.filter} options={options} value={selectedOptions} onChange={setSelectedOptions} getTitle={(value) => value.length ? value.map((v) => v.value).join(', ') : 'Filter'}/>
        <div className={styles.totalBox}>
          <Text view='subtitle' color='primary'>Total products</Text>
          <Text className={styles.count} view='p-20' weight='bold' color='accent'>{total}</Text>
        </div>
        
    </div>
  )
}

export default Menu