import React from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Delete, DeleteIcon, Edit } from "lucide-react"
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsThreeDots } from 'react-icons/bs';


export default function WebhookOptions() {
  return (
    <div className=' flex place-content-end'>
        <div className=' mx-5'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant={'outline'} className=' hover:shadow h-[28px] text-xs'><BsThreeDots/></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-46 mr-3 ">
                <DropdownMenuLabel className=" text-xs">Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={()=>{}}>
                    <Edit className="mr-2 h-3 w-3 " />
                    <span className=" text-xs font-medium">Edit Product</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>{}}>
                    <RiDeleteBin6Line className="mr-2 h-3 w-3 text-red-600" />
                    <span className=" text-red-600 text-xs font-medium">Delete</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
  )
}
