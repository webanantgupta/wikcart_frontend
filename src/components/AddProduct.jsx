import React, { useState } from 'react';
import axios from 'axios';

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    unit: '',
    condition: '',
    productType: 'single',
    purchasePrice: '',
    unitPrice: '',
    quantity: '',
    sku: '',
    discount: '',
    discountType: 'flat',
    summary: '',
    description: '',
    youtubeLink: '',
    metaTitle: '',
    metaDescription: '',
    taxStatus: 'taxable',
    codType: 'anywhere',
    lowStockQuantity: '',
    minQuantity: '',
    maxQuantity: '',
  });

  const [toggles, setToggles] = useState({
    featured: false,
    refundable: false,
    authentic: true,
    warranty: false,
    attachmentOnPurchase: false,
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    thumbnail: null,
    gallery: [],
    pdf: null,
    metaImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFiles(prev => ({ ...prev, [fileType]: file }));
    }
  };

  const handleMultipleFiles = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(prev => ({ ...prev, gallery: [...prev.gallery, ...files] }));
  };





const handleSave = async () => {
  setLoading(true);

  try {
    const data = new FormData();

    // =========================
    // REQUIRED VALIDATION
    // =========================
    if (!uploadedFiles.thumbnail) {
      alert("Thumbnail image is required");
      setLoading(false);
      return;
    }

    // =========================
    // TEXT FIELDS
    // =========================
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("brand", formData.brand);
    data.append("unit", formData.unit);

    data.append("product_condition", formData.condition);
    data.append("product_type", formData.productType);

    data.append("purchase_price", formData.purchasePrice || 0);
    data.append("unit_price", formData.unitPrice || 0);

    data.append("quantity", formData.quantity || 0);

    data.append("sku", formData.sku);

    data.append("discount", formData.discount || 0);
    data.append("discount_type", formData.discountType);

    data.append("summary", formData.summary);
    data.append("description", formData.description);

    data.append("youtube_link", formData.youtubeLink);

    data.append("meta_title", formData.metaTitle);

    data.append(
      "meta_description",
      formData.metaDescription
    );

    data.append(
      "low_stock_quantity",
      formData.lowStockQuantity || 0
    );

    data.append(
      "purchase_quantity_minimum",
      formData.minQuantity || 1
    );

    data.append(
      "purchase_quantity_maximum",
      formData.maxQuantity || 10
    );

    // =========================
    // TAGS
    // =========================
    data.append("tags", JSON.stringify([]));

    // =========================
    // BOOLEAN VALUES
    // =========================
    data.append(
      "featured",
      toggles.featured ? 1 : 0
    );

    data.append(
      "refundable",
      toggles.refundable ? 1 : 0
    );

    data.append(
      "authentic",
      toggles.authentic ? 1 : 0
    );

    data.append(
      "warranty",
      toggles.warranty ? 1 : 0
    );

    data.append(
      "attachment_on_purchase",
      toggles.attachmentOnPurchase ? 1 : 0
    );

    data.append(
      "cash_on_delivery",
      formData.codType === "anywhere" ? 1 : 0
    );

    // =========================
    // FILES
    // =========================
    if (uploadedFiles.thumbnail) {
      data.append(
        "thumbnail_image",
        uploadedFiles.thumbnail
      );
    }

    if (uploadedFiles.pdf) {
      data.append(
        "pdf_specification",
        uploadedFiles.pdf
      );
    }

    if (uploadedFiles.metaImage) {
      data.append(
        "meta_image",
        uploadedFiles.metaImage
      );
    }

    uploadedFiles.gallery.forEach((file) => {
      data.append("gallery_images", file);
    });

    // =========================
    // DEBUGGING
    // =========================
    for (let pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }

    // =========================
    // API CALL
    // =========================
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v2/create-product`,
      data,
      {
        headers: {
            Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);

    alert("Product created successfully!");

  } catch (error) {
    console.log("FULL ERROR =>", error);

    console.log(
      "BACKEND ERROR =>",
      error.response?.data
    );

    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Something went wrong";

    alert(`Error: ${errorMessage}`);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Main Form */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            <FormSection title="Product Information">
              <FormInput label="Name" type="text" placeholder="Product Name" name="name" value={formData.name} onChange={handleInputChange} />
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <FormSelect label="Categories" name="category" value={formData.category} onChange={handleInputChange} 
                  options={[{ value: '', label: 'Select category' }, { value: 'electronics', label: 'Electronics' }]} />
                <FormSelect label="Brand" name="brand" value={formData.brand} onChange={handleInputChange} 
                  options={[{ value: '', label: 'Select brand' }, { value: 'brand-a', label: 'Brand A' }]} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormSelect label="Unit" name="unit" value={formData.unit} onChange={handleInputChange} 
                  options={[{ value: 'piece', label: 'Piece' }, { value: 'kg', label: 'Kg' }]} />
                <FormSelect label="Condition" name="condition" value={formData.condition} onChange={handleInputChange} 
                  options={[{ value: 'new', label: 'New' }, { value: 'used', label: 'Used' }]} />
              </div>
            </FormSection>

            <FormSection title="Product Type">
              <div className="flex gap-8">
                <RadioLabel label="Single Product" name="productType" value="single" checked={formData.productType === 'single'} onChange={handleInputChange} />
                <RadioLabel label="Variant Product" name="productType" value="variant" checked={formData.productType === 'variant'} onChange={handleInputChange} />
              </div>
            </FormSection>

            <FormSection title="Product Price & Stock">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* <PriceInput label="Purchase Price" placeholder="0.00" name="purchasePrice" value={formData.purchasePrice} onChange={handleInputChange} />
                <PriceInput label="Unit Price" placeholder="0.00" name="unitPrice" value={formData.unitPrice} onChange={handleInputChange} /> */}
                <PriceInput
  label="Purchase Price"
  placeholder="0.00"
  name="purchasePrice"
  value={formData.purchasePrice}
  onChange={handleInputChange}
  currency="₹"
/>

<PriceInput
  label="Unit Price"
  placeholder="0.00"
  name="unitPrice"
  value={formData.unitPrice}
  onChange={handleInputChange}
  currency="₹"
/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormInput label="Quantity" type="number" placeholder="0" name="quantity" value={formData.quantity} onChange={handleInputChange} />
                <FormInput label="SKU" type="text" placeholder="Type SKU" name="sku" value={formData.sku} onChange={handleInputChange} />
              </div>
            </FormSection>

            <FormSection title="Product Description">
              <FormTextarea label="Summary" placeholder="Short summary..." name="summary" value={formData.summary} onChange={handleInputChange} rows="3" />
              <FormTextarea label="Description" placeholder="Detailed description..." name="description" value={formData.description} onChange={handleInputChange} rows="5" />
            </FormSection>

            <FormSection title="Product Images">
              <FileUploadBox label="Thumbnail" size="300x300" icon="🖼️" fileName={uploadedFiles.thumbnail?.name} onFileChange={(e) => handleFileChange(e, 'thumbnail')} />
              <FileUploadBox label="Gallery Images" size="600x600" icon="📁" multiple onFileChange={handleMultipleFiles} fileName={uploadedFiles.gallery.length > 0 ? `${uploadedFiles.gallery.length} files selected` : ''} />
            </FormSection>
          </div>

          {/* Right Column: Settings */}
          <div className="flex flex-col gap-4">
            <SettingsCard title="Tax Configuration">
              <label className="block text-xs font-medium text-gray-500 mb-2">Tax Status</label>
              <select name="taxStatus" value={formData.taxStatus} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-300 rounded-md text-sm outline-blue-500">
                <option value="taxable">Taxable</option>
                <option value="non-taxable">Non-taxable</option>
              </select>
            </SettingsCard>

            <ToggleCard title="Featured" checked={toggles.featured} onChange={() => handleToggle('featured')} />
            <ToggleCard title="Refundable" checked={toggles.refundable} onChange={() => handleToggle('refundable')} />
            
            <SettingsCard title="Purchase Quantity">
              <FormInput label="Min" type="number" name="minQuantity" value={formData.minQuantity} onChange={handleInputChange} />
              <FormInput label="Max" type="number" name="maxQuantity" value={formData.maxQuantity} onChange={handleInputChange} />
            </SettingsCard>

            <button 
              onClick={handleSave} 
              disabled={loading}
              className={`w-full text-white p-4 rounded-lg font-medium transition-colors shadow-md ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? 'Uploading...' : 'Save Product'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Components
function FormSection({ title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-medium text-gray-800 mb-5">{title}</h2>
      {children}
    </div>
  );
}

function SettingsCard({ title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      {title && <h3 className="text-sm font-medium text-gray-700 mb-3">{title}</h3>}
      {children}
    </div>
  );
}

function FormInput({ label, type, placeholder, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
    </div>
  );
}

function FormSelect({ label, name, value, onChange, options }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>
      <select name={name} value={value} onChange={onChange}
        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-sm cursor-pointer outline-none focus:ring-2 focus:ring-blue-500">
        {options.map((opt, idx) => <option key={idx} value={opt.value}>{opt.label}</option>)}
      </select>
    </div>
  );
}

function FormTextarea({ label, placeholder, name, value, onChange, rows }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>
      <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows={rows}
        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
    </div>
  );
}

// function PriceInput({ label, name, value, onChange, currency }) {
//   return (
//     <div className="w-full">
//       <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>
//       <div className="flex">
//         <input type="number" name={name} value={value} onChange={onChange} 
//           className="flex-1 p-3 bg-gray-50 border border-gray-300 rounded-l-md text-sm outline-none focus:ring-2 focus:ring-blue-500" />
//         <span className="p-3 bg-gray-200 border border-gray-300 border-l-0 rounded-r-md text-gray-600 text-sm">{currency}</span>
//       </div>
//     </div>
//   );
// }

function PriceInput({
  label,
  name,
  value,
  onChange,
  currency = "₹",
  placeholder,
}) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-600 mb-1.5">
        {label}
      </label>

      <div className="flex">
        <input
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 p-3 bg-gray-50 border border-gray-300 rounded-l-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />

        <span className="p-3 bg-gray-200 border border-gray-300 border-l-0 rounded-r-md text-gray-600 text-sm">
          {currency}
        </span>
      </div>
    </div>
  );
}

function RadioLabel({ label, name, value, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} 
        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
      <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">{label}</span>
    </label>
  );
}

function ToggleCard({ title, checked, onChange }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
      <span className="text-sm font-medium text-gray-700">{title}</span>
      <input type="checkbox" checked={checked} onChange={onChange} 
        className="w-10 h-5 cursor-pointer accent-blue-600" />
    </div>
  );
}

function FileUploadBox({ label, size, icon, fileName, onFileChange, multiple }) {
  const id = React.useId();
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <p className="text-xs text-gray-400 mb-2">{size}</p>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
        <div className="text-2xl mb-2">{icon}</div>
        <input type="file" multiple={multiple} onChange={onFileChange} className="hidden" id={id} />
        <label htmlFor={id} className="text-blue-600 font-medium cursor-pointer text-sm">
          Click to upload
        </label>
        {fileName && <p className="text-xs text-gray-500 mt-2 italic">{fileName}</p>}
      </div>
    </div>
  );
}