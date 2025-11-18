import {
  ChartNoAxesColumnIncreasing,
  PlusCircle,
  ShoppingBag,
} from "lucide-react";
import CreateProductForm from "./ui/createProductFrom/CreateProductForm";
import ProductsTable from "./ui/productsTable/ProductsTable";
import { useState } from "react";
import Analytics from "./ui/analytics/Analytics";

const AdminDashboard = () => {
  const [currentTab , setCurrentTab] = useState<"create" | "table" | "analytics">("table")
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex flex-col capitalize">'>
      <h1 className="text-3xl lg:text-4xl xl:text-5xl text-success font-bold text-center mb-4">
        Admin Dashboard
      </h1>
      <div className="tabs tabs-lift">
        <label onClick={()=>setCurrentTab('create')} className="tab text-success">
          <input type="radio" name="my_tabs_4" />
          <PlusCircle size={16} />
          <span className="ml-1">Create Product</span>
        </label>
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <CreateProductForm currentTab={currentTab} />
        </div>

        <label onClick={()=>setCurrentTab('table')} className="tab text-success">
          <input type="radio" name="my_tabs_4" defaultChecked />
          <ShoppingBag size={16} />
          <span className="ml-1">Products</span>
        </label>
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <ProductsTable currentTab={currentTab} />
        </div>

        <label onClick={()=>setCurrentTab('analytics')} className="tab text-success">
          <input type="radio" name="my_tabs_4" />
          <ChartNoAxesColumnIncreasing />
          <span className="ml-1">Analytics</span>
        </label>
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <Analytics/>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
