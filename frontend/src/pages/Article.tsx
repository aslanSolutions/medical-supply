import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { ArticleUsage } from "@/components/usage-chart";
import type { Article } from "@/types/article";
import { useArticles } from "@/hooks/useArticles";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@mui/material";

export default function ArticleDetails() {
  const { getArticle, patch, remove } = useArticles();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Article | null>(null);
  const [amount, setAmount] = useState(1);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editSaving, setEditSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    supplier: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      //console.log("fetching product with id:", id);
      const found = await getArticle(id);
      //console.log("fetched finished: ", found);

      setProduct(found || null);
    };
    fetchProduct();
  }, [id]);

  const usageChart = useMemo(
    () => (
      <ArticleUsage
        data={[
          { name: "Jan", v1: 36, v2: 19 },
          { name: "Feb", v1: 45, v2: 23 },
          { name: "Mar", v1: 26, v2: 12 },
          { name: "Apr", v1: 39, v2: 20 },
          { name: "May", v1: 26, v2: 12 },
          { name: "Jun", v1: 42, v2: 31 },
          { name: "Jul", v1: 38, v2: 19 },
          { name: "Aug", v1: 39, v2: 20 },
          { name: "Sep", v1: 37, v2: 18 },
          { name: "Oct", v1: 41, v2: 22 },
          { name: "Nov", v1: 45, v2: 24 },
          { name: "Dec", v1: 23, v2: 17 },
        ]}
      />
    ),
    []
  );

  if (!product) {
    return (
      <main className="p-8">
        <p className="text-gray-600">Product not found.</p>
      </main>
    );
  }

  const handleSave = async () => {
    if (!product || editSaving) return;
    const priceNum =
      editForm.price.trim() === "" ? null : Number(editForm.price);
    if (priceNum !== null && (Number.isNaN(priceNum) || priceNum < 0)) {
      alert("Please enter a valid non-negative price.");
      return;
    }

    const payload: Partial<Article> = {
      count: product.count,
      supplier: editForm.supplier.trim() || undefined,
      category: editForm.category.trim() || undefined,
      ...(priceNum === null ? { price: undefined } : { price: priceNum }),
    };
    const prev = product;
    const next = { ...product, ...payload };
    setProduct(next);
    setEditSaving(true);

    try {
      const updated: Article | void = await patch(product.id, payload);
      if (updated) setProduct(updated);
      setEditMode(false);
    } catch (e) {
      console.error("Save failed", e);
      setProduct(prev);
      alert("Failed to save changes. Please try again.");
    } finally {
      setEditSaving(false);
    }
  };

  const handleRestock = async () => {
    if (!product || amount <= 0 || saving) return;
    const prev = product;
    const newCount = (product.count ?? 0) + amount;
    setProduct({ ...product, count: newCount });
    setSaving(true);
    try {
      const updated: Article | void = await patch(product.id, {
        count: newCount,
      });
      if (updated) setProduct(updated);
    } catch (err) {
      console.error("Failed to restock:", err);
      setProduct(prev);
      alert("Failed to restock. Please try again.");
    } finally {
      setSaving(false);
      setAmount(1);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      remove(product.id);
      navigate("/");
    }
  };

  return (
    <main className="max-w-5xl mx-auto p-8 flex flex-col gap-8">
      <header className="mb-12 flex flex-col items-start">
        <h1 className="text-4xl font-bold mb-3">Article Details</h1>
        <p className="text-gray-500">
          View and manage product information, stock levels, and actions.
        </p>
      </header>

      <section className=" text-left">
        <h2 className="font-bold mb-4 text-[22px]"> Description</h2>
        <p>
          {product.description ?? "No available description for this product."}
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="border border-gray-100 rounded-lg p-6  bg-white shadow">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[22px] text-left">
              Product Information
            </h2>
            <i
              onClick={() => setEditMode(true)}
              className="fi fi-rr-edit text-[#13a4ec] hover:text-[#1e6d94] cursor-pointer text-lg"
            ></i>
          </div>

          <hr className="my-4 border-gray-200" />

          <div className="flex md:justify-start md:gap-25 text-left">
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-gray-500">Product Name</span>
                <span>{product.name}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Product ID</span>
                <span>{product.id}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Category</span>
                {editMode ? (
                  <TextField
                    id="outlined-basic"
                    variant="standard"
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, category: e.target.value }))
                    }
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <i className="fi fi-rr-pencil text-xs"></i>
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{ width: 100 }}
                    disabled={editSaving}
                  />
                ) : (
                  <span>{product.category ?? "—"}</span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-gray-500">Supplier</span>
                {editMode ? (
                  <TextField
                    id="outlined-basic"
                    variant="standard"
                    value={editForm.supplier}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, supplier: e.target.value }))
                    }
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <i className="fi fi-rr-pencil text-xs"></i>
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{ width: 100 }}
                    disabled={editSaving}
                  />
                ) : (
                  <span>{product.supplier ?? "—"}</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Unit Price</span>
                {editMode ? (
                  <TextField
                    id="outlined-basic"
                    variant="standard"
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, price: e.target.value }))
                    }
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <i className="fi fi-rr-pencil text-xs"></i>
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{ width: 100 }}
                    disabled={editSaving}
                  />
                ) : (
                  <span>{product.price ?? "—"}</span>
                )}
              </div>
              {editMode && (
                <div className="flex mt-6 gap-4 md:flex">
                  <Button
                    onClick={handleSave}
                    sx={{
                      width: 100,
                      bgcolor: "#13a4ec",
                      "&:hover": { bgcolor: "#1e6d94" },
                    }}
                    variant="contained"
                    disabled={editSaving}
                  >
                    {editSaving ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    onClick={() => {
                      setEditForm({
                        supplier: product.supplier ?? "",
                        price: product.price?.toString?.() ?? "",
                        category: product.category ?? "",
                      });
                      setEditMode(false);
                    }}
                    sx={{ width: 100 }}
                    variant="outlined"
                    color="error"
                    disabled={editSaving}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="border border-gray-100 rounded-lg p-6  bg-white shadow">
          <h2 className="font-bold mb-4 text-[22px] text-left">
            Inventory Management
          </h2>
          <hr className="my-4 border-gray-200 " />
          <div className="mb-4 text-left">
            <p className="text-gray-500">Quantity on Hand</p>
            <p className="text-2xl font-bold">
              {product.count}{" "}
              <span className="text-gray-500 text-base">Units</span>
            </p>
          </div>

          <div className="mb-4 text-left">
            <p className="text-gray-500 mb-1">Adjust Quantity</p>
            <div className="flex items-center gap-2 rounded w-50">
              <button
                className="flex items-center justify-center rounded-md h-10 w-12 bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200 transition-colors text-2xl font-bold cursor-pointer"
                onClick={() => setAmount((a) => Math.max(1, a - 1))}
                disabled={saving}
              >
                –
              </button>
              <input
                min={1}
                max={10000}
                value={amount}
                onChange={(e) =>
                  setAmount(
                    Math.max(1, Number.parseInt(e.target.value, 10) || 1)
                  )
                }
                className="w-20 h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-0"
                disabled={saving}
              />
              <button
                className="flex items-center justify-center rounded-md h-10 w-12 bg-gray-100 hover:bg-gray-200 transition-colors text-2xl font-bold cursor-pointer"
                onClick={() => setAmount((a) => a + 1)}
                disabled={saving}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              className="flex justify-center items-center gap-2 flex-1 bg-[#13a4ec] hover:bg-[#1e6d94] cursor-pointer text-white font-medium py-2 rounded"
              onClick={handleRestock}
            >
              Restock Product
            </button>

            <button
              className=" cursor-pointer flex items-center justify-center rounded-md h-11 w-11 bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
              onClick={handleDelete}
            >
              <i className="fi fi-br-trash"></i>
            </button>
          </div>
        </section>
      </div>

      <section>{usageChart}</section>
    </main>
  );
}
