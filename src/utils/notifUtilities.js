import { notification } from 'antd';

export const successNotif = (title, description) => {
    notification["success"]({
        message: title,
        description: description
    });
};

export const errorNotif = (description) => {
    notification["error"]({
        message: "Error",
        description: description
    });
};