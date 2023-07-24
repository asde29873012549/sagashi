import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { GiCancel } from "react-icons/gi";

import {useState} from "react"
import { v4 as uuid } from 'uuid';
  

export default function Sell() {
  const [tags, setTags] = useState([])
  const [tagInputValue, setTagInputValue] = useState("")

  const onTagInputKeyDown = (e, id) => {
	if (e.keyCode === 32 || e.keyCode === 13) {
		setTags([...tags, {
			id,
			value:e.target.value}])
		setTagInputValue("")
	}
  }

  const onInput = e => {
	setTagInputValue(e.target.value)
  }

  const onCancelTag = (tagId) => {
	setTags(tags.filter(tag => tag.id !== tagId))
  }

  return (
    <main className="p-4">
	  <div className="grid grid-cols-2 gap-4 mx-72">
		<div className="col-span-2 text-3xl font-semibold my-8">Details</div>
		<Select>
			<SelectTrigger className="w-auto h-12">
				<SelectValue placeholder="Department/Category" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="menswear">Menswear</SelectItem>
				<SelectItem value="womenswear">Womenswear</SelectItem>
			</SelectContent>
		</Select>
		<Select>
			<SelectTrigger className="w-auto h-12">
				<SelectValue placeholder="Sub-Category" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="light">Light</SelectItem>
				<SelectItem value="dark">Dark</SelectItem>
				<SelectItem value="system">System</SelectItem>
			</SelectContent>
		</Select>
		<Select>
			<SelectTrigger className="w-auto mt-6 h-12">
				<SelectValue placeholder="Designer" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="light">Light</SelectItem>
				<SelectItem value="dark">Dark</SelectItem>
				<SelectItem value="system">System</SelectItem>
			</SelectContent>
		</Select>
		<Select>
			<SelectTrigger className="w-auto mt-6 h-12">
				<SelectValue placeholder="Size" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="light">Light</SelectItem>
				<SelectItem value="dark">Dark</SelectItem>
				<SelectItem value="system">System</SelectItem>
			</SelectContent>
		</Select>

		<div className="col-span-1 text-3xl font-semibold my-8">Item Name</div>
		<div className="col-span-1 text-3xl font-semibold my-8">Color</div>
		<Input placeholder="Item Name" className="w-auto h-12"/>
		<Input placeholder='Designer Color Name, i.e. "Frozen Yellow"' className="w-auto h-12"/>

		<div className="col-span-1 text-3xl font-semibold my-8">Condition</div>
		<div className="col-span-1 text-3xl font-semibold my-8">Price</div>
		<Select>
			<SelectTrigger className="w-auto h-12">
				<SelectValue placeholder="Condition" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="light">Light</SelectItem>
				<SelectItem value="dark">Dark</SelectItem>
				<SelectItem value="system">System</SelectItem>
			</SelectContent>
		</Select>
		<Input placeholder="Price" className="w-auto h-12"/>

		<div className="col-span-2 text-3xl font-semibold my-8">Description</div>
		<Textarea className="col-span-2 h-48" placeholder="Add details about condition, how the garments fits, additional measurements, etc."/>
	  </div>
	  <div className="mx-72">
	  	<div className="text-3xl font-semibold my-12">Tags</div>
		<div>
			{tags.map(tag => <Button variant="secondary" className="hover:bg-destructive mr-2 mb-2" onClick={() => onCancelTag(tag.id)}>#{tag.value}<GiCancel className="ml-1"/></Button>)}
		</div>
		<Input placeholder="#tags" className="h-12 mt-3" onKeyDown={e => onTagInputKeyDown(e, uuid())} onChange={onInput} value={tagInputValue}/>
	  </div>
    </main>
  );
}
