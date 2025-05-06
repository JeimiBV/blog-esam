import { Sidebar } from "./components/Sidebar";
import AreaPage from "./pages/AreaPage";
import OverviewPage from "./pages/OverviewPage";
import { Route, Routes } from "react-router";
import UserPage from "./pages/UserPage";
import RolePage from "./pages/RolePage";
import PostTypePage from "./pages/PostTypePage";
import { Toaster } from "react-hot-toast";
import PostForm from "./components/post/PostForm";
import PostTable from "./components/post/PostTable";
import PostPage from "./pages/PostPage";
import PostView from "./components/post/PostView";
import AreaTable from "./components/area/AreaTable";
import AreaForm from "./components/area/AreaForm";
import PostTypeForm from "./components/postType/PostTypeForm";
import PostTypeTable from "./components/postType/PostTypeTable";

function App() {
  return (
    <div className="flex h-screen bg-white text-gray-800 overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300 opacity-80"></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
      </div>

      <Sidebar />
      <Routes>
        <Route path="/" element={<OverviewPage />} />

        <Route path="/posts" element={<PostPage />}>
          <Route index element={<PostTable />} />
          <Route path="create" element={<PostForm />} />
          <Route path="edit/:id" element={<PostForm />} />
          <Route path=":id" element={<PostView />} />
        </Route>

        <Route path="/areas" element={<AreaPage />}>
          <Route index element={<AreaTable />} />
          <Route path="create" element={<AreaForm />} />
          <Route path="edit/:id" element={<AreaForm />} />
        </Route>

        <Route path="/post-types" element={<PostTypePage />}>
          <Route index element={<PostTypeTable />} />
          <Route path="create" element={<PostTypeForm />} />
          <Route path="edit/:id" element={<PostTypeForm />} />
        </Route>

        <Route path="/users" element={<UserPage />} />
        <Route path="/roles" element={<RolePage />} />
      </Routes>
      <div>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
