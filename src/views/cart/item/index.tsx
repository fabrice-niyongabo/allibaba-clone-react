import { useEffect, useState } from "react";
import { ICartItem, IProduct, TOAST_MESSAGE_TYPES } from "../../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { app } from "../../../constants";
import { currencyFormatter, toastMessage } from "../../../helpers";
import { addCartItem } from "../../../actions/cart";

interface IProps {
  item: ICartItem;
  calCulateCartTotal: any;
  setShowAlert: any;
  setSelectedItem: any;
}
function CartItem({
  item,
  calCulateCartTotal,
  setSelectedItem,
  setShowAlert,
}: IProps) {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.products);
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  useEffect(() => {
    const prod = products.find((pr) => pr.pId === item.productId);
    if (prod) {
      setProduct(prod);
    }
  }, []);

  const handleMinus = () => {
    if (item.quantity - 1 >= 1) {
      dispatch(addCartItem({ ...item, quantity: item.quantity - 1 }));
      calCulateCartTotal();
    }
  };
  const handlePlus = () => {
    if (!product) return;
    // if (item.quantity + 1 <= product.quantity) {
    dispatch(addCartItem({ ...item, quantity: item.quantity + 1 }));
    calCulateCartTotal();
    // } else {
    //   toastMessage(
    //     TOAST_MESSAGE_TYPES.INFO,
    //     "You have reached the total quantity available in the stock."
    //   );
    // }
  };
  return (
    <tr>
      <td>
        <button
          className="btn btn-light text-danger"
          onClick={() => {
            setSelectedItem(item);
            setShowAlert(true);
          }}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </td>
      <td>
        <img
          src={(app.FILE_URL as any) + product?.images[0]?.image}
          alt={product?.name}
          className="prod-img"
        />
      </td>
      <td>{product?.name}</td>
      <td>{currencyFormatter(item.price)}</td>
      <td>
        <button className="btn btn-light" onClick={() => handleMinus()}>
          -
        </button>
        <span>{item.quantity}</span>
        <button className="btn btn-light" onClick={() => handlePlus()}>
          +
        </button>
      </td>
      <td>{currencyFormatter(item.price * item.quantity)} RWF</td>
    </tr>
  );
}

export default CartItem;
