import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface SearchAndFilterProps {
  onSearch: (term: string) => void;
  onFilterChange: (category: string) => void;
  categories: string[];
}

const SearchAndFilter = ({ onSearch, onFilterChange, categories }: SearchAndFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    onFilterChange(category);
  };

  return (
    <div className={`flex gap-4 items-center mb-6 transition-all duration-700 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 bg-blog-dark border-blog-accent text-white placeholder:text-gray-400 focus:ring-primary"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-blog-accent">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {selectedCategory}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-blog-dark border-blog-accent">
          <DropdownMenuItem
            className="text-white hover:bg-blog-accent cursor-pointer"
            onClick={() => handleCategorySelect('All')}
          >
            All
          </DropdownMenuItem>
          {categories.map((category) => (
            <DropdownMenuItem
              key={category}
              className="text-white hover:bg-blog-accent cursor-pointer"
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchAndFilter;
