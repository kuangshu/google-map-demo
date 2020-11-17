class ColorControl {
  private polygon_: google.maps.Polygon;
  public controlUI: HTMLElement;
  constructor(polygon: google.maps.Polygon) {
    this.polygon_ = polygon;
    this.controlUI = document.createElement('button');
    this.controlUI.style.marginBottom = '30px';
    this.controlUI.style.borderRadius = '3px';
    this.controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    this.controlUI.style.cursor = 'pointer';
    this.controlUI.style.textAlign = 'center';
    this.controlUI.innerHTML = "Click to change the Polygon's Color";

    this.controlUI.addEventListener('click', () => {
      this.polygon_.setOptions({
        fillColor: randomColor(),
      });
    });
  }
  updatePolygon(polygon: google.maps.Polygon) {
    this.polygon_ = polygon;
  }
}

function randomColor() {
  const colors = ['#1b486b', '#28a352', '#b2db34', '#f2ac34', '#fc7634'];
  let index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

export default ColorControl;
