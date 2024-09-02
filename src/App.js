import React, { useState } from 'react'
import { Home, Users, CheckSquare, BarChart, Search } from 'lucide-react'
import './index.css';
// import { Input } from "components/ui/input"
// import { Select } from "components/ui/select"
// import { Button } from "components/ui/button"

const TabButton = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    className={`flex flex-col items-center justify-center p-2 ${
      isActive ? 'text-blue-500' : 'text-gray-500'
    }`}
    onClick={onClick}
  >
    <Icon size={24} />
    <span className="text-xs mt-1">{label}</span>
  </button>
)

const ProductCard = ({ image, name, price }) => (
  <div className="border rounded-lg overflow-hidden shadow-sm">
    <img src={image} alt={name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-green-600 font-bold mt-2">${price.toFixed(2)}</p>
    </div>
  </div>
)

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')

  const products = [
    { id: 1, name: "Smartphone", price: 599.99, category: "electronics", image: "/placeholder.svg?height=200&width=200" },
    { id: 2, name: "Laptop", price: 999.99, category: "electronics", image: "/placeholder.svg?height=200&width=200" },
    { id: 3, name: "Running Shoes", price: 79.99, category: "sports", image: "/placeholder.svg?height=200&width=200" },
    { id: 4, name: "Coffee Maker", price: 49.99, category: "home", image: "/placeholder.svg?height=200&width=200" },
    { id: 5, name: "Backpack", price: 39.99, category: "accessories", image: "/placeholder.svg?height=200&width=200" },
    { id: 6, name: "Headphones", price: 129.99, category: "electronics", image: "/placeholder.svg?height=200&width=200" },
  ]

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (category === 'all' || product.category === category)
  )

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <select
          value={category}
          onValueChange={setCategory}
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="sports">Sports</option>
          <option value="home">Home</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('Home')

  const tabs = [
    { id: 'Home', icon: Home, label: 'Home', content: <HomeScreen /> },
    { id: 'Team', icon: Users, label: 'Team', content: <div>Team Content</div> },
    { id: 'Tasks', icon: CheckSquare, label: 'Tasks', content: <div>Tasks Content</div> },
    { id: 'Dashboard', icon: BarChart, label: 'Dashboard', content: <div>Dashboard Content</div> },
  ]

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-y-auto p-4">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </main>
      <nav className="flex justify-around border-t border-gray-200 bg-white">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            icon={tab.icon}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </nav>
    </div>
  )
}