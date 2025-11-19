'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Filter,
  Settings,
  List,
  LayoutGrid,
  FileText,
  FileArchive,
  Sheet,
  MoreVertical,
  Plus,
} from 'lucide-react';
import { documents } from '@/lib/data';
import type { Document } from '@/lib/types';

const fileTypeIcons: Record<Document['type'], React.ReactNode> = {
  pdf: <FileText className="h-6 w-6 text-red-500" />,
  docx: <FileText className="h-6 w-6 text-blue-500" />,
  txt: <FileText className="h-6 w-6 text-gray-500" />,
  zip: <FileArchive className="h-6 w-6 text-yellow-500" />,
  xlsx: <Sheet className="h-6 w-6 text-green-500" />,
};

const tagColors: { [key: string]: string } = {
    Confidential: 'bg-green-500/20 text-green-400 border-green-500/20',
    Shared: 'bg-purple-500/20 text-purple-400 border-purple-500/20',
    'Brand Assets': 'bg-blue-500/20 text-blue-400 border-blue-500/20',
}

export default function DocumentManagerPage() {
  const [view, setView] = useState('list');

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/80 p-4 backdrop-blur-sm">
        <h1 className="text-xl font-bold">Document Manager</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Filter className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 space-y-4 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search documents..." className="pl-10" />
        </div>

        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="File Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="docx">DOCX</SelectItem>
              <SelectItem value="txt">TXT</SelectItem>
              <SelectItem value="zip">ZIP</SelectItem>
              <SelectItem value="xlsx">XLSX</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="date-desc">Newest</SelectItem>
              <SelectItem value="size-desc">Size (High-Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">My Documents</h2>
          <div className="flex items-center rounded-md bg-card p-1">
            <Button
              variant={view === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-7 w-7"
              onClick={() => setView('list')}
            >
              <List className="h-5 w-5" />
            </Button>
            <Button
              variant={view === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-7 w-7"
              onClick={() => setView('grid')}
            >
              <LayoutGrid className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid gap-3">
          {documents.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="flex items-center gap-4 p-3">
                <div className="rounded-lg bg-card p-2">
                    {fileTypeIcons[doc.type]}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-semibold">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {doc.size} &bull; Uploaded {doc.uploadDate}
                  </p>
                  {doc.tag && (
                    <Badge variant="outline" className={tagColors[doc.tag.label]}>
                        {doc.tag.label}
                    </Badge>
                  )}
                </div>
                <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6">
        <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
          <Plus className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
}
