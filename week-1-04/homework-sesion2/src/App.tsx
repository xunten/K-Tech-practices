import "./App.css";
import LikeButton from "./components/LikeButton";
import ButtonAccordion from "./components/ButtonAccordion";
import ButtonTabs from "./components/ButtonTabs";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import Rating from "./components/Rating";
import SlideWithThumb from "./components/SlideWithThumb";

const images = [
  {
    id: 1,
    src: "../public/images/1.jpg",
    alt: "maygiat",
  },
  { id: 2, src: "../public/images/2.jpg", alt: "loa" },
  {
    id: 3,
    src: "../public/images/3.jpg",
    alt: "camera",
  },
  { id: 4, src: "../public/images/4.jpg", alt: "book" },
  {
    id: 5,
    src: "../public/images/5.jpg",
    alt: "headphone",
  },
];

const tabData = [
  {
    id: 1,
    title: "HISTORY",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
  },
  {
    id: 2,
    title: "APPROACH",
    content:
      "Contenido de tabNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
  },
  {
    id: 3,
    title: "CULTURE",
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est.",
  },
  {
    id: 4,
    title: "METHOD",
    content:
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
  },
];

const accordionData = [
  {
    id: 1,
    title: "HISTORY",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
  },
  {
    id: 2,
    title: "APPROACH",
    content:
      "Contenido de tabNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
  },
  {
    id: 3,
    title: "CULTURE",
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est.",
  },
  {
    id: 4,
    title: "METHOD",
    content:
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
  },
];

function App() {
  return (
    <main className="App">
      <div className="title">LikeButton</div>
      <div className="component">
        <LikeButton icon={<AiOutlineLike size={20} />} active={<AiFillLike size={20} />} />
      </div>

      <div className="title">Rating</div>
      <div className="component">
        <Rating />
      </div>

      <div className="title">Slide with Thumb</div>
      <div className="component">
        <SlideWithThumb images={images} />
      </div>

      <div className="title">Button Tabs</div>
      <div className="container">
        <ButtonTabs data={tabData} />
      </div>

      <div className="title">Button Accordions</div>
      <div className="container">
        <ButtonAccordion data={accordionData} />
      </div>
    </main>
  );
}

export default App;
