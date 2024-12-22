import { createBrowserRouter, Navigate } from 'react-router-dom';
import { HOME_PATH, ROOT_PATH, TIME_TRACKING } from './path';
import { Dashboard } from '../dashboard';
import { Task } from '../tasks/Task';
import { TimeTracking } from '../time_tracking/TimeTracking';
import { ErrorComponent } from '../shared/components/ErrorComponent';

export const router = createBrowserRouter([
    {
        path: ROOT_PATH,
        element: <Navigate to={HOME_PATH} replace />,
    },
    {

        path: HOME_PATH,
        element: <Dashboard />,
        errorElement: <ErrorComponent />,
        children: [
            {
                path: HOME_PATH,
                element: <Task />
            },
            {
                path: TIME_TRACKING,
                element: <TimeTracking />
            }
        ]
    }
])
