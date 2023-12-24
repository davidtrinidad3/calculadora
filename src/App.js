import './App.css';
import Boton from './componentes/Boton';
import Pantalla from './componentes/Pantalla';
import BotonClear from './componentes/BotonClear';
import {useState} from 'react';
import {evaluate} from 'mathjs';

function App() {
	const [input, setInput] = useState('');

	const agregarInput = (val) => {
		// Verificar si el input está vacío y el valor actual es un operador o un punto
		if (!input && (val === '.' || /[+\-.*/]/.test(val))) {
			return;
		}
		// Verificar si el último carácter es un operador
		const ultimoCaracterEsOperador = /[+\-.*/]$/.test(input);

		// Verificar si el valor actual es un operador
		const esOperador = /[+\-.*/]/.test(val);

		// Verificar si el valor actual es un punto
		const esPunto = val === '.';

		// Verificar si el último carácter es un número
		const ultimoCaracterEsNumero = /\d$/.test(input);

		// Verificar si el último carácter es un operador seguido de un número
		const ultimoCaracterEsOperadorYNumero = /[+\-*/]\d$/.test(input);

		if (ultimoCaracterEsOperador && esOperador) {
			return;
		}

		if (
			esPunto &&
			!ultimoCaracterEsNumero &&
			!ultimoCaracterEsOperadorYNumero
		) {
			return;
		}

		// Concatenar el valor al estado
		setInput(input + val);
	};

	const calcularResultado = () => {
		const ultimoCaracterEsOperador = /[+\-.*/]$/.test(input);

		// Verificar si hay operaciones válidas en la cadena de entrada
		const hayOperacionesValidas = /(\d+[+\-.*/]\d+)$/.test(input);

		if (
			!ultimoCaracterEsOperador &&
			hayOperacionesValidas &&
			input.trim() !== ''
		) {
			if (/[+\-*/]/.test(input)) {
				setInput(evaluate(input));
			}
		}
	};

	return (
		<div className='App'>
			<div className='freecodecamp-logo-contenedor'>
				<h1 className='titulo-calculadora'>CALCULADORA</h1>
			</div>
			<div className='contenedor-calculadora'>
				<Pantalla input={input} />
				<div className='fila'>
					<Boton manejarClick={agregarInput}>1</Boton>
					<Boton manejarClick={agregarInput}>2</Boton>
					<Boton manejarClick={agregarInput}>3</Boton>
					<Boton manejarClick={agregarInput}>+</Boton>
				</div>
				<div className='fila'>
					<Boton manejarClick={agregarInput}>4</Boton>
					<Boton manejarClick={agregarInput}>5</Boton>
					<Boton manejarClick={agregarInput}>6</Boton>
					<Boton manejarClick={agregarInput}>-</Boton>
				</div>
				<div className='fila'>
					<Boton manejarClick={agregarInput}>7</Boton>
					<Boton manejarClick={agregarInput}>8</Boton>
					<Boton manejarClick={agregarInput}>9</Boton>
					<Boton manejarClick={agregarInput}>*</Boton>
				</div>
				<div className='fila'>
					<Boton manejarClick={calcularResultado}>=</Boton>
					<Boton manejarClick={agregarInput}>0</Boton>
					<Boton manejarClick={agregarInput}>.</Boton>
					<Boton manejarClick={agregarInput}>/</Boton>
				</div>
				<div className='fila'>
					<BotonClear manejarClear={() => setInput('')}>Clear</BotonClear>
				</div>
			</div>
		</div>
	);
}

export default App;
