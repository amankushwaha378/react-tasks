import { Routes, Route } from "react-router-dom";

import TaskLayout from "./layouts/TaskLayout";

import Task1 from "./tasks/Task1";
import Task2 from "./tasks/Task2";
import Task3 from "./tasks/Task3";
import Task4 from "./tasks/Task4";
import Task5 from "./tasks/Task5";
import Task6 from "./tasks/Task6";
import Task7 from "./tasks/Task7";
import Task77 from "./tasks/Task77";
import Task8 from "./tasks/Task8";
import Task80 from "./tasks/Task80";

import Task83Virtuoso from "./tasks/Task83ReactVirtuoso";
import Task83ReactWindow from "./tasks/Task83ReactWindow";
import Task83Tanstack from "./tasks/Task83Tanstack";

import Task84 from "./tasks/Task84";
import Task9 from "./tasks/Task9";
import Task88 from "./tasks/Task88";
import Task89 from "./tasks/Task89";
import BasicTable from "./tanstack-table/BasicTable";
import LodashPlayground from "./components/LodashPlayground";
import TailwindMergePlayground from "./components/TwPlayground";
import ReactSelectPlayground from "./components/ReactSelect";
import DateFnsPlayground from "./components/DateFnsPlayground";

function App() {
    return (
        <Routes>

            <Route path="/" element={<TaskLayout />}>

                <Route index element={<Task1 />} />

                <Route path="task-1" element={<Task1 />} />
                <Route path="task-2" element={<Task2 />} />
                <Route path="task-3" element={<Task3 />} />
                <Route path="task-4" element={<Task4 />} />
                <Route path="task-5" element={<Task5 />} />
                <Route path="task-6/*" element={<Task6 />} />
                <Route path="task-7" element={<Task7 />} />

                <Route path="task-77" element={<Task77 />} />

                <Route path="task-8" element={<Task8 />} />

                <Route path="task-80/*" element={<Task80 />} />

                <Route
                    path="task-83/tanstack"
                    element={<Task83Tanstack />}
                />

                <Route
                    path="task-83/react-window"
                    element={<Task83ReactWindow />}
                />

                <Route
                    path="task-83/virtuoso"
                    element={<Task83Virtuoso />}
                />

                <Route path="task-84" element={<Task84 />} />

                <Route path="task-9" element={<Task9 />} />

                <Route path="task-88" element={<Task88/>} />
                <Route path="task-89" element={<Task89/>} />
                <Route path="task-90" element={<BasicTable/>} />
                <Route path="task-92" element={<LodashPlayground/>} />
                <Route path="task-93" element={<TailwindMergePlayground/>} />
                <Route path="task-94" element={<ReactSelectPlayground/>} />
                <Route path="task-95" element={<DateFnsPlayground/>} />







            </Route>

        </Routes>
    );
}

export default App;