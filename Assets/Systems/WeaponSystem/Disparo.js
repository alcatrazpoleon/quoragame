
var Tiempo = 0;
var TiempoMaximo = 3;
var	Objeto : GameObject;
var Rango = 100;
var Municion = 30;
var	ComprobanteMunicion = 30;
var Cargador = 90;
var	UIMunicion : UI.Text;
var UICargador : UI.Text;
var Animacion : GameObject;
var AnimacionDisparar = 1.0;
var AudioDisparo : AudioClip;
var Efecto : GameObject;

function Start(){

	UIMunicion.text = Municion.ToString();
	UICargador.text = Cargador.ToString();
	Efecto.active = false;
}

function Update(){

	if(Input.GetButton("Disparo1")){

		Tiempo += 1;
	}

	if(Tiempo > TiempoMaximo){

		Tiempo = 0;
	}


	if(Tiempo == TiempoMaximo && Municion >= 1 && !Animacion.GetComponent.<Animation>().IsPlaying("REcargar") && !Animacion.GetComponent.<Animation>().IsPlaying("Disparar")){

		Municion -= 1;
		UIMunicion.text = Municion.ToString();
		transform.GetComponent.<AudioSource>().PlayOneShot(AudioDisparo);
		Efecto.active = true;
		var Disparo : RaycastHit;
		var Posicion = transform.parent.position;
		var Direccion = transform.TransformDirection(Vector3.forward);

		if(Physics.Raycast(Posicion,Direccion,Disparo,Rango)){

		var Rotacion = Quaternion.FromToRotation(Vector3.up, Disparo.normal);

			if(Disparo.collider.tag == "Tierra"){

				Instantiate(Objeto,Disparo.point,Rotacion);

			}
			

		}

		Animacion.GetComponent.<Animation>()["Disparar"].speed = AnimacionDisparar;
		Animacion.GetComponent.<Animation>().Play("Disparar", PlayMode.StopAll);
		Invoke("FX", 0.2);
		Tiempo = 0;
		}

	if(Input.GetKeyDown(KeyCode.R) && Cargador > 0){

		Municion = 0;
		UIMunicion.text = Municion.ToString();
		Animacion.GetComponent.<Animation>().Play("REcargar", PlayMode.StopAll);
		Invoke("Recargar" , 1);
	}

}

function Recargar(){

	Municion += ComprobanteMunicion;
	Cargador -= ComprobanteMunicion;

	UIMunicion.text = Municion.ToString();
	UICargador.text = Cargador.ToString();
}

function FX(){
	Efecto.active=false;
}