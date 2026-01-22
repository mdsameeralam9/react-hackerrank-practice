import { useEffect, useRef, useState, useCallback } from "react";

const LIMIT = 10;

export default function InfiniteProducts() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  const fetchProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    const res = await fetch(
      `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`,
    );
    const data = await res.json();

    setProducts((prev) => [...prev, ...data.products]);
    setSkip((prev) => prev + LIMIT);

    if (skip + LIMIT >= data.total) {
      setHasMore(false);
    }

    setLoading(false);
  }, [skip, loading, hasMore]);

  // initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  // observer logic
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchProducts();
        }
      },
      { threshold: 1 },
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [fetchProducts]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Infinite Products</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16,
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 12,
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: "100%", height: 120, objectFit: "cover" }}
            />
            <h4>{product.title}</h4>
            <p>₹ {product.price}</p>
          </div>
        ))}
      </div>

      {/* Sentinel */}
      <div ref={sentinelRef} style={{ height: 40, marginTop: 20 }}>
        {loading && "Loading..."}
        {!hasMore && "No more products"}
      </div>
    </div>
  );
}
