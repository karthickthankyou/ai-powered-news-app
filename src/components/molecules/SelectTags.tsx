'use client'
import React, { useState } from 'react'

import { Input } from '../atoms/input'

import { Label } from '../atoms/label'

import { BaseComponent } from '@/util/types'
import { cn } from '@/util/styles'
import { Badge } from '../atoms/badge'

interface BadgesInputProps extends BaseComponent {
  onChange: (tags: string[]) => void
}

export const SelectTags: React.FC<BadgesInputProps> = ({
  className,
  onChange,
}) => {
  const [value, setValue] = useState('')
  const [badges, setBadges] = useState<string[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    const tags = e.target.value
    const tagsArray = tags
      .split(',')
      .map((tag) => tag.trim().split(' ').join('-'))
      .filter((tag) => tag !== '')
    setBadges(tagsArray)
    onChange(tagsArray)
  }

  return (
    <div className={cn('space-y-2', className)}>
      <Label title="Tags">
        <Input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder="sports, headlines, trending,"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm form-input sm:text-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {badges.map((badge, index) => (
          <Badge variant={'outline'} key={index}>
            {badge}
          </Badge>
        ))}
      </div>
    </div>
  )
}
