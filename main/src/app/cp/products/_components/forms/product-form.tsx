'use client';

import {
	useActionState,
	useEffect,
	useState,
} from 'react';
import { useFormStatus } from 'react-dom'

import { Loader } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { 
	Select, 
	SelectContent, 
	SelectGroup, 
	SelectItem, 
	SelectLabel, 
	SelectTrigger, 
	SelectValue 
} from '@/components/ui/select';

export function ProductForm({
	action,
	defaultValues,
	onPendingChange
}: {
	action: (
		state: unknown,
		payload: any,
	) => any
	defaultValues?: { [key: string ]: unknown }
	onPendingChange?: (state: boolean) => unknown
}) {
	const [error, submitAction, isPending] = useActionState(action, null);
	const [files, setFiles] = useState<FileList | null>(null)

	useEffect(() => setFiles(null), [error])

	useEffect(() => {
		if (typeof onPendingChange === 'function')
			onPendingChange(isPending)
	}, [isPending])

	return (
		<form id={'product-form'} className="space-y-8" action={submitAction}>
			<div className="space-y-2">
				<Label htmlFor="productName">Name</Label>
				<Input
					id="productName"
					name="name"
					type="text"
					placeholder="Enter product name"
					maxLength={2 ** 6}
					disabled={isPending}
					defaultValue={
						typeof defaultValues?.name === 'string' ?
						defaultValues.name : 
						''
					}
					autoComplete="off"
					required
				/>
				{error?.name?.[0] && (
					<p className='text-destructive text-sm font-medium'>
						{error?.name?.[0]}	
					</p>
				)}
			</div>
			<div className="space-y-2">
				<Label htmlFor="priceInTheSmallestDenomination">
					Price (in the smallest denomination)
				</Label>
				<Input
					id="priceInTheSmallestDenomination"
					name="priceInTheSmallestDenomination"
					type="number"
					min="0"
					pattern="[^0-9]"
					placeholder="Enter price"
					defaultValue={
						typeof defaultValues?.priceInTheSmallestDenomination === 'number' ?
						defaultValues.priceInTheSmallestDenomination :
						''
					}
					disabled={isPending}
					autoComplete="off"
					required
				/>
				<p className="text-sm text-muted-foreground">
					Only integer value is allowed
				</p>
				{error?.priceInTheSmallestDenomination?.[0] && (
					<p className='text-destructive text-sm font-medium'>
						{error?.priceInTheSmallestDenomination?.[0]}	
					</p>
				)}
			</div>
			<div className="w-full space-y-2">
				<Label htmlFor='status'>Status</Label>
				<Select
					name='status'
					defaultValue={
						typeof defaultValues?.status === 'string' ?
						defaultValues.status :
						''
					}
				>
					<SelectTrigger>
						<SelectValue placeholder='Select product status'/>
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>
								Avalaible status
							</SelectLabel>
							<SelectItem value='active'> 
								Active
							</SelectItem>
							<SelectItem value='archived'>
								Archived
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<div className="w-full space-y-2">
				<Label htmlFor="productShot">Product shots</Label>
				<Input
					id="productShot"
					name="productShot"
					type="file"
					accept="image/*"
					disabled={isPending}
					onChange={e => setFiles(e.target.files)}
					multiple
				/>
				{(files?.length && (
					<div className="max-w-full grid grid-cols-4 auto-rows-auto grid-flow-row gap-2">
						{[...files].map(file => (	
							<img 
								src={URL.createObjectURL(file)}
								className='w-full h-full object-cover aspect-square' 
								key={file.name}
							/>
						))}
					</div>
				)) || null}
				<p className="text-sm text-muted-foreground">
					The maximum amount is 4 per product
				</p>	
				{error?.productShot?.[0] &&	(
					<p className='text-destructive text-sm font-medium'>
						{error?.productShot?.[0]}	
					</p>
				)}
			</div>
			{typeof defaultValues?.id === 'string' && (
				<input 	
					type='hidden' 
					value={defaultValues.id} 
					name='id' 
				/>
			)}
		</form>
	);
}

export function Submit() {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" form='product-form'>
			{pending ? (
				<>
					<Loader className="h-4 w-4 animate-spin" />
				</>
			) : (
				<>Save</>
			)}
		</Button>
	);
}
