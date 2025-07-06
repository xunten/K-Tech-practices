import "./App.css";
import Attributes from "./components/Attributes";
import Rating from "./components/Rating";
import RenderList01 from "./components/RenderList01";
import RenderList04 from "./components/RenderList04";
import RenderList05 from "./components/RenderList05";
import SortDropdown from "./components/SortDropdown";
import ViewedProducts from "./components/ViewedProducts";

const tintuc = [
  {
    id: 1,
    thumbnail: "images/tintuc/tt-1.jpg",
    title:
      "Ấn tượng đầu tiên Samsung Galaxy A32 4G: Với hơn 6 triệu đã có màn hình Super AMOLED 90Hz",
    time: "4 năm trước",
  },
  {
    id: 2,
    thumbnail: "images/tintuc/tt-2.jpg",
    title:
      "Google Pixel 5a dự kiến sẽ được ra mắt cùng thời điểm với Android 12",
    time: "4 năm trước",
  },
  {
    id: 3,
    thumbnail: "images/tintuc/tt-3.jpg",
    title:
      "Galaxy A52 4G lộ diện trên Google Play Console Xác nhận dùng chip Snapdragon 720",
    time: "4 năm trước",
  },
  {
    id: 4,
    thumbnail: "images/tintuc/tt-4.jpg",
    title:
      "Galaxy A82 5G chuẩn bị ra mắt với chip flagship và màn hình trượt độc đáo, Samfans gom lúa đi là vừa",
    time: "4 năm trước",
  },
];

const phukien = [
  {
    id: 1,
    image: "/images/list04/Apple-USBC-To-SDCard-A.jpg",
    discount: "-25%",
    title: "Cáp chuyển đổi USB-C sang SD",
    newPrice: "790.000đ",
    oldPrice: "1.200.000đ",
  },
  {
    id: 2,
    image: "/images/list04/type-c-20-w.png",
    title: "Adapter sạc Apple Type C 20W",
    newPrice: "520.000đ",
  },
  {
    id: 3,
    image: "/images/list04/cap-lightning-to-usb-cable-md818zma-1.jpg",
    title: "Cáp sạc Lightning 2m",
    newPrice: "840.000đ",
  },
  {
    id: 4,
    image: "/images/list04/airpod-3.png",
    discount: "-25%",
    title: "AirPods 3",
    newPrice: "890.000đ",
    oldPrice: "1.450.000đ",
  },
];

const giadung = [
  {
    id: 1,
    image: "/images/list05/1.jpg",
    title: "LG White Front Load Steam Washer",
    shop: "YOUNG SHOP",
    rating: 4,
    sold: 10,
    newPrice: "$1,422.7",
    oldPrice: "$1,025.5",
    discount: "-39%",
  },
  {
    id: 2,
    image: "/images/list05/2.jpg",
    title: "Edifier Powered Bookshelf Speakers",
    shop: "YOUNG SHOP",
    rating: 4,
    sold: 15,
    newPrice: "$96",
    oldPrice: "$85",
    discount: "-13%",
  },
  {
    id: 3,
    image: "/images/list05/3.jpg",
    title: "Amcrest Security Camera in White Color",
    shop: "YOUNG SHOP",
    rating: 4,
    sold: 20,
    newPrice: "$62.99",
    oldPrice: "$45.9",
    discount: "-37%",
  },
  {
    id: 4,
    image: "/images/list05/4.jpg",
    title: "Grand Slam Indoor Of Show Jumping Novel",
    shop: "YOUNG SHOP",
    rating: 4,
    sold: 22,
    newPrice: "$41.99",
    oldPrice: "$32.99",
    discount: "-27%",
  },
  {
    id: 5,
    image: "/images/list05/5.jpg",
    title: "Sound Intone I65 Earphone White Version",
    shop: "YOUNG SHOP",
    rating: 4,
    sold: 10,
    newPrice: "$106.96",
    oldPrice: "$100.99",
    discount: "-6%",
  },
  {
    id: 6,
    image: "/images/list05/6.jpg",
    title: "Korea Long Sofa Fabric In Blue Navy Color",
    shop: "YOUNG SHOP",
    rating: 4,
    sold: 79,
    newPrice: "$670.2",
    oldPrice: "$567.8",
    discount: "-18%",
  },
];

const attributes = [
  { id: 1, label: "Đen" },
  { id: 2, label: "Hồng" },
  { id: 3, label: "Xanh" },
];

const rating = [
  { id: 1, label: "Rất tệ" },
  { id: 2, label: "Tệ" },
  { id: 3, label: "Bình thường" },
  { id: 4, label: "Tốt" },
  { id: 5, label: "Tuyệt vời" },
];

const viewed = [
  {
    id: 1,
    name: "vivo Y18 8GB/128GB",
    image: "/images/viewed/vivo.jpg",
    price: "4.410.000₫",
  },
  {
    id: 2,
    name: "FESTINA 40 mm Nam F20007/2",
    image: "/images/viewed/festina.jpg",
    price: "3.646.000₫",
  },
  {
    id: 3,
    name: "Samsung Galaxy A55 5G 8GB/256GB",
    image: "/images/viewed/samsung-galaxy-a55.jpg",
    isDiscontinued: true,
  },
  {
    id: 4,
    name: "Samsung Galaxy A56 5G 12GB/256GB",
    image: "/images/viewed/samsung-galaxy-a56.jpg",
    price: "11.480.000₫",
  },
];

const options = [
  { id: 1, label: "Sản phẩm nổi bật" },
  { id: 2, label: "Giá từ thấp đến cao" },
  { id: 3, label: "Giá từ cao đến thấp" },
];

function App() {
  return (
    <main className="container">
      {/* Render list 01 */}
      <section className="section">
        <div className="section_header">
          <h2 className="section_title">TIN MỚI</h2>
          <div className="section_extra">
            <a href="#">Xem thêm</a>
          </div>
        </div>
        <div className="section_body">
          <RenderList01 data={tintuc} />
        </div>
      </section>

      {/* Render list 04 */}
      <section className="section">
        <div className="section_header">
          <h2 className="section_title">Phụ kiện tương thích</h2>
        </div>
        <RenderList04 data={phukien} />
      </section>

      {/* Render list 05 */}
      <section className="section">
        <div className="deal-header">
          <div className="deal-header-left">
            <h2>Deal of the day</h2>
            <div className="countdown">
              End in: <span>6:17:17:39</span>
            </div>
          </div>
          <a className="deal-header-right" href="#">
            View all
          </a>
        </div>
        <div className="section_body">
          <RenderList05 data={giadung} />
        </div>
      </section>

      {/* State 01 */}
      <section className="section">
        <div className="section_header">
          <h2 className="section_title">Thuộc tính sản phẩm</h2>
        </div>
        <Attributes data={attributes} />
      </section>

      {/* State 02 */}
      <section className="section">
        <div className="section_header">
          <h2 className="section_title">Đánh giá sản phẩm</h2>
        </div>
        <Rating data={rating} />
      </section>

      {/* State 03 */}
      <section className="section">
        <ViewedProducts data={viewed} />
      </section>

      {/* State 04 */}
      <section className="section">
        <SortDropdown data={options} />
      </section>
    </main>
  );
}

export default App;
