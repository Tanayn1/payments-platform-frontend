"use client"

import * as React from "react"
import { Check, ChevronsUpDown, StoreIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CommandList } from "cmdk"


const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

interface Combobox {
    stores: Array<any>,
    setStore: Function,
    store: string | null | undefined
}

export function ComboboxDemo({stores, setStore, store} : Combobox) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<null | string | undefined>(null)


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] h-[34px] text-sm text-gray-600  justify-between"
        >
          {value
            ? <div className=" flex gap-3 items-center"><StoreIcon className=" h-5 w-5"/> {value}</div> 
            :  store ? <div className=" flex gap-3 items-center"><StoreIcon className=" h-5 w-5" /> {store}</div>  : "Select Store"} 
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Stores" />
          <CommandEmpty>No stores found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
          { stores && stores.map((store :any, index : number) => (
              <CommandItem
                key={index}
                value={store.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setStore(store.id)
                  setOpen(false)
                  console.log(currentValue)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === store.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {store.name}
              </CommandItem>
            ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
