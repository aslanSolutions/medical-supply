import { Routes, Route } from "react-router-dom";
import "./App.css";
import "@flaticon/flaticon-uicons/css/solid/rounded.css";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import CreateArticle from "@/pages/CreateArticle";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles/:id" element={<Article />} />
      <Route path="/articles" element={<CreateArticle />} />
    </Routes>
  );
}
