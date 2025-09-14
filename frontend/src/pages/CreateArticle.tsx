import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { medicalIcons } from "@/util/icon-mapper";
import { useArticles } from "@/hooks/useArticles";

export default function CreateArticle() {
  const { create } = useArticles();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [qty, setQty] = useState<number | "">("");
  const [unit, setUnit] = useState("");
  const [des, setDes] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [icon, setIcon] = useState("");
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");

  const isValid =
    name.trim().length > 0 && typeof qty === "number" && qty > 0 && unit !== "";

  const handleSave = async () => {
    if (!isValid) return;

    await create({
      name,
      unit,
      count: qty as number, 
      icon: icon || "", 
      description: des || undefined,
      price: price === "" ? undefined : (price as number),
      category: category || undefined,
      supplier: supplier || undefined,
    });

    navigate("/");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow">
        <header className="mb-1">
          <h1 className="text-xl md:text-2xl font-bold">Add New Article</h1>
          <p className="text-gray-500 mt-1">
            Fill in the details below to add a new article to the inventory.
          </p>
        </header>

        <form
          className="mt-6 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div>
            <label className="flex justify-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <i className="fi fi-rr-id-card-clip-alt"></i>
              Article Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Sterile Gauze Pads"
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex justify-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <i className="fi fi-rr-hastag"></i>
                Quantity in Stock
              </label>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10);
                  setQty(Number.isFinite(v) && v > 0 ? v : "");
                }}
                placeholder="e.g., 100"
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="flex justify-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <i className="fi fi-rr-cubes"></i>
                Unit
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="e.g., For wound cleaning"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="text-left mt-4 space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <i className="fi fi-rr-info"></i> Description (optional)
              </label>
              <textarea
                value={des}
                onChange={(e) => setDes(e.target.value)}
                placeholder="e.g., For wound cleaning"
                rows={3}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <i className="fi fi-rr-objects-column"></i>
                Category (optional)
              </label>

              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Medical Supplies"
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <i className="fi fi-rr-tags"></i>
                Price (optional)
              </label>
              <input
                type="number"
                min={0}
                step="0.01"
                value={price}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  setPrice(Number.isFinite(v) && v >= 0 ? v : "");
                }}
                placeholder="e.g., 5.99"
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <i className="fi fi-rr-images"></i> Icon (optional)
              </label>

              <div className="relative">
                <select
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an icon</option>
                  {Object.keys(medicalIcons).map((key) => (
                    <option key={key} value={key}>
                      {medicalIcons[key]} {key}
                    </option>
                  ))}
                </select>
                <i className="fi fi-br-angle-small-down pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <i className="fi fi-rr-box-open"></i> Supplier (optional)
              </label>
              <input
                type="text"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                placeholder="e.g., MediCorp Inc."
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="cursor-pointer rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isValid}
              className="
                flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white cursor-pointer
                bg-[#13a4ec] hover:bg-blue-500 transition-colors
                disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300
              "
            >
              <i className="fi fi-br-plus-small cursor-pointer" />
              Save Article
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
