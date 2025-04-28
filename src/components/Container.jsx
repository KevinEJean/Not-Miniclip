function Container(className="") {
  /*
  swicth(classname) {
    case game1:
      return *code for game1*
      break;
    case game2:
      return *code for game2*
      break;
    case game3:
      return *code for game3*
      break;
    case game4:
      return *code for game4*
      break;
  }
  */
  return (
    <div className={className} style={{ width: "500px", height: "250px", backgroundColor: "rgba(236, 239, 202, 1)", borderRadius: "10px", boxShadow: "0 0 12px 6px #000" }}>
      <h2 style={{ textAlign: "center", fontFamily: "Pixelify Sans, sans-serif" }}>?nom_du_jeux</h2>
    </div>
  )
}

export default Container;