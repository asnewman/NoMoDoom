import axios from "axios";

const log = async (level: "info" | "error", message: any) => {
  // try {
  //   if (process.env.IS_LOCAL === "false") {
  //     await axios.post(
  //       `https://listener.logz.io:8071/?token=${process.env.LOGZIO_TOKEN}&type=cyclic-server`,
  //       JSON.stringify({
  //         message,
  //       })
  //     );
  //   }
  // } catch (e) {
  //   console.error(e);
  // }

  if (level === "error") {
    console.error(message);
  } else {
    console.info(message);
  }
};

export default log;
