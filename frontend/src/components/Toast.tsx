type Props = { message: string; type?: "ok" | "error"; visible: boolean }
function Toast({ message, type = "ok", visible }: Props) {
  return (
    <div id="toast" className={`toast ${visible ? "show" : ""} ${type === "error" ? "error" : ""}`}>
      {message}
    </div>
  )
}
export default Toast
