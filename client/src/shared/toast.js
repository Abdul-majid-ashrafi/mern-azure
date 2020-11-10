import { message } from 'antd';
import swal from 'sweetalert';

export const toast = (type, msg, duration = 1.5) => {
    if (type === "error") {
        message.error(msg, [duration]);
    } else if (type === "success") {
        message.success(msg);
    } else {
        message.info(msg);
    }
};

export const sweetalert = (type, msg) => {
    swal({
        text: msg,
        icon: type
    })
};
