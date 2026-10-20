import { useEffect } from 'react';
import { useOrders } from '@/features/orders/hooks/use-orders';
import { useShopStore } from '@/stores/shop/shop.store';

function ShopInitializer() {
  const { data: orders } = useOrders();

  const shopId = useShopStore((state) => state.shopId);
  const setShopId = useShopStore((state) => state.setShopId);

  useEffect(() => {
    if (shopId !== 0 || !orders?.length) return;

    const latestOrder = [...orders].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )[0];

    if (latestOrder) {
      setShopId(latestOrder.shop.id);
    }
  }, [orders, shopId, setShopId]);

  return null;
}

export default ShopInitializer;
