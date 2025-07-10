import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import MyTaskPage from "./pages/MyTaskPage";
import OurTaskPage from "./pages/OurTaskPage";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import UpdateTaskPage from "./pages/UpdateTask";
import ViewTaskPage from "./pages/ViewTaskPage";

export default function ToDoApp() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<DefaultLayout />}>
                        <Route index element={<LoginPage />} />
                        <Route path="/login" element={<LoginPage />} />

                        <Route path="/tasks" element={<OurTaskPage />} />
                        <Route path="/my-task" element={<MyTaskPage />} />
                        <Route path="/update-task/:id" element={<UpdateTaskPage />} />
                        <Route path="/view-task/:id" element={<ViewTaskPage />} />
                        <Route path="/create-task" element={<CreateTaskPage />} />

                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}