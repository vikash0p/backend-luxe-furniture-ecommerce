import colors from "colors";

colors.enable();

const levelIcons = {
  info: "ℹ️",
  success: "✅",
  warn: "⚠️",
  error: "❌",
};

/** @type {{ [key: string]: Function }} */
const levelColors = {
  info: colors.cyan,
  success: colors.green,
  warn: colors.yellow,
  error: colors.red,
};

const getTimestamp = () => {
  return new Date().toLocaleTimeString();
};


const logMessage = (level, msg, scope) => {
  const icon = levelIcons[level];
  const color = levelColors[level];

  const time = colors.gray(`[${getTimestamp()}]`);
  const tag = scope ? colors.bold(`[${scope}]`) : "";
  const message = color(`${icon} ${msg}`);

  console.log(`${time} ${tag} ${message}`);
};

export const log = {
  info: (msg, scope) => logMessage("info", msg, scope),
  success: (msg, scope) => logMessage("success", msg, scope),
  warn: (msg, scope) => logMessage("warn", msg, scope),
  error: (msg, scope) => logMessage("error", msg, scope),
};
