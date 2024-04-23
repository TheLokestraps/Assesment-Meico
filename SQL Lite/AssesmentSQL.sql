INSERT INTO PEDIDOS
(Orden_no, Tipo, FechaPedido, articulo, Vlrtotal, Cliente)
VALUES(633436, 'MAYORISTA', '2022-02-20', 93710, 1785589, 109191),
(633436, 'MAYORISTA', '2022-02-20', 93714, 2584832, 109191),
(634091, 'TAT', '2021-02-24', 93712, 243000, 109188),
(634091, 'TAT', '2019-03-24', 93716, 203399, 109188),
(634091, 'TAT', '2014-02-24', 93717, 156600, 109188),
(634132, 'MAYORISTA', '2014-02-24', 93712, 891000, 109186),
(634132, 'MAYORISTA', '2014-02-24', 93715, 444401, 109186),
(634132, 'MAYORISTA', '2014-02-24', 93716, 745798, 109186),
(634132, 'MAYORISTA', '2022-01-24', 93719, 313501, 109186),
(634132, 'MAYORISTA', '2019-05-24', 94030, 1, 109186);


CREATE TABLE ARTICULO (
    ID INTEGER PRIMARY KEY,
    NombreArticulo TEXT,
    PrecioUnitario INTEGER,
    Estado TEXT
);

INSERT INTO ARTICULO (ID, NombreArticulo, PrecioUnitario, Estado) VALUES
(93710, 'Agua Clara', 15000, 'ACTIVO'),
(93714, 'Old Parr', 20000, 'ACTIVO'),
(93712, 'Aceite Selecto', 5400, 'INACTIVO'),
(93716, 'Harina Pan', 15400, 'ACTIVO'),
(93717, 'Bombilla Ahorradora', 4747, 'INACTIVO');

SELECT * FROM ARTICULO a 

/* 2.1 */

SELECT p.Orden_no,DATE(p.FechaPedido) AS FechaPedido, p.articulo, 
IFNULL(a.NombreArticulo, 'INEXISTENTE') AS NombreArticulo,
IFNULL(a.PrecioUnitario, -1) As PrecioUnitario ,p.Vlrtotal,
CASE IFNULL(a.Estado, 'INACTIVO')
	WHEN 
		'ACTIVO' THEN 'EN STOCK'
	WHEN
		'INACTIVO' THEN 'FUERA DE STOCK'
		END As Estado
From PEDIDOS p 
LEFT JOIN ARTICULO a ON p.articulo = a.ID
WHERE DATE(p.FechaPedido) > DATE('2021-01-01') AND DATE(p.FechaPedido) < DATE('2022-05-31');

/* 2.2 */

select p.cliente,p.fechapedido, p.artículo,p.vlrtotal
from pedidos p 
LEFT JOIN 
	ARTICULO a
ON 
	p.articulo = a.ID
where fechapedido >= ‘2018-05-01’ AND a.estado != 'INACTIVO'


and artículo not in (
select art_codigo
from articulo
where estado = ‘INACTIVO’
);



