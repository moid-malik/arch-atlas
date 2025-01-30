import { Input } from '../ui/input'

export default function Search() {
    const handleSearch = async (formData:FormData) => {
        "use server"
    }
  return (
    <form action={handleSearch}>
        <Input 
        type='search'
        name='search'
        placeholder='Search...'
        className='w-[400px]'
        />
    </form>
  )
}
