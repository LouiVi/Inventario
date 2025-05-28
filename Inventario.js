cfg.Light, cfg.MUI;
app.LoadPlugin( "Utils" );

var db;

//Called when application is started.
function OnStart()
{
	utils = app.CreateUtils();
  color = utils.GetRandomColor("white");
	utils.SetTheme(color);
	lay = app.CreateLayout( "Linear", "Top,HCenter,FillXY" )
	txt = app.CreateText( "Inventario", 1, 0.1)
	txt.SetFontFile( "Misc/LuckiestGuy-Regular.ttf" )
	txt.SetTextSize( 24 )
  txt.SetTextColor( "#FFFFFF" )
  txt.SetTextShadow( 7, 2, 2, "#000000" )
  txt.SetPadding( 0, 0.01, 0, 0.01 )
  txt.SetBackGradient(  utils.GetGradientColors(color)[0], color,  utils.GetGradientColors(color)[1])
	lay.AddChild( txt )
	lay2 = app.CreateLayout( "Linear", "Horizontal, FillX" );
	lay.AddChild( lay2 );
	numprod = app.CreateTextEdit( "009603122355", 0.62, -1 );
	numprod.SetHint( "Scan or write" );
	numprod.SetOnEnter( SearchProduct );
	
	lay2.AddChild( numprod );
	btnsearch = app.CreateButton( "Search", 0.38,-1 );
	lay2.AddChild( btnsearch );
	
	btnsearch.SetOnTouch(  SearchProduct );
	lay3 = app.CreateLayout( "Linear", "Horizontal, FillX" );
	lay.AddChild( lay3 );
	numprod2 = app.CreateTextEdit( "", 1, -1 );
	numprod2.SetEnabled( false );
  lay3.AddChild( numprod2 )
  lay4 = app.CreateLayout( "Linear", "Horizontal, FillX" );
	lay.AddChild( lay4 );
	descripcion = app.CreateTextEdit( "", 1, -1 );
	descripcion.SetEnabled( false );
  lay4.AddChild( descripcion )
  lay3.Hide();
  lay4.Hide();
  lay5 = app.CreateLayout( "Linear", "Horizontal, FillX" );
	lay.AddChild( lay5 );
	lblCosto = app.CreateText( "Costo:", 0.5, -1 );
  lblPrecio= app.CreateText( "Precio:", 0.5, -1 );
  lay5.AddChild( lblCosto);
  lay5.AddChild( lblPrecio );
  lay5.Hide();
  lay6 = app.CreateLayout( "Linear", "Horizontal, FillX" );
	lay.AddChild( lay6 );
	datCosto = app.CreateTextEdit( "", 0.5, -1 );
  datPrecio= app.CreateTextEdit( "", 0.5, -1 );
  datCosto.SetEnabled( false );
  datPrecio.SetEnabled( false );
  lay6.AddChild( datCosto );
  lay6.AddChild( datPrecio );
  lay6.Hide();
  lay7 = app.CreateLayout( "Linear", "Horizontal, FillX" );
	lay.AddChild( lay7 );
	lay7.Hide();
	lbldisponible = app.CreateText( "Disponible:", 0.45, -1 );
	lay7.AddChild( lbldisponible);
	datdisponible = app.CreateTextEdit( "", 0.3, -1 );
	datdisponible.SetEnabled( false );
	lay7.AddChild( datdisponible );
	btnaddremove = app.CreateButton( "+", 0.25, -1 );
	btnaddremove.SetOnTouch( ()=>{p = parseInt(prompt("Enter the quantity: \r\n(- to decrease, + to increase)", "0")); datdisponible.SetText( parseInt(datdisponible.GetText())+p );});
	lay7.AddChild( btnaddremove );
	app.AddLayout( lay );
	MoveDatabase();
	//OpenDatabase();
}

function SearchProduct()
{
	db = app.OpenDatabase( dbProd );
	//app.ShowPopup( "Database is ready." );
	db.ExecuteSql("SELECT * FROM INVENTARIO WHERE Num_Producto = '" + numprod.GetText() + "'",[], OnResult);
}

function OnResult( results )   
{  
    app.ShowProgress( "Searching ..." );
    //var s = "";  
    //var len = results.rows.length;  
    var item = results.rows.item(0);
    numprod2.SetText( item.Num_Producto );
    descripcion.SetText( item.Descripcion );
    datCosto.SetText( item.Costo );
    datPrecio.SetText( item.Precio );
    datdisponible.SetText( item.Cantidad_Disponible );
    app.HideProgress();
    lay3.Animate( "SlideFromLeft" );
    lay4.Animate( "SlideFromRight" );
    lay5.Animate( "SlideFromTop" );
    lay6.Animate( "SlideFromBottom" );
    lay7.Animate( "Rubberband" );
    //s += item.id + ", " + item.data + ", " + item.data_num + "\n";   
    //txt.SetText( s )  
}  


function MoveDatabase()
{
	dbProd = app.GetAppPath()+ "/Misc/inventory.sqlite";//"/storage/emulated/0/Download/sqlite/invxx.sqlite";
	//app.CopyFile(app.GetAppPath()+ "/Misc/inventory.sqlite", dbProd);
}

function OpenDatabase()
{
	db = app.OpenDatabase( dbProd );
	app.ShowPopup( "Database is ready." );
}