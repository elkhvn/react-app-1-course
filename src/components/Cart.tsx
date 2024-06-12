interface CartProps {
  cartItems: string[];
  onClear: (item: string) => void;
}

const Cart = ({ cartItems, onClear }: CartProps) => {
  return (
    <>
      <div>Cart</div>
      <ul>
        {cartItems.map((cartItem) => (
          <li onClick={() => onClear(cartItem)} key={cartItem}>
            {cartItem}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Cart;
