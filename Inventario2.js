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
  txt.SetBackGradient(  utils.GetGradientColors(color)[0], color,  utils.GetGradientColors(color)[1]);
	lay.AddChild( txt )
	lay2 = app.CreateLayout( "Linear", "Horizontal, FillX" );
	lay.AddChild( lay2 );
	numprod = app.CreateTextEdit( "009603122355", 0.62, -1,"numbers");
	numprod.SetHint( "Scan or write" ); 
	numprod.SetOnEnter( SearchProduct );
	//numprod.SetOnFocus( ClearLayout );
	lay2.AddChild( numprod );
	btnsearch = app.CreateButton( "Search", 0.38,-1 );
	lay2.AddChild( btnsearch );
	
	btnsearch.SetOnTouch(  SearchProduct );
	lay3 = app.CreateLayout( "Linear", "Horizontal, FillX" );
	lay.AddChild( lay3 );
	numprod2 = app.CreateSpinner( "", 1, -1 );
	numprod2.SetOnChange( SearchProduct2 )
	//numprod2.SetEnabled( false );
  lay3.AddChild( numprod2 )
  lay4 = app.CreateLayout( "Linear", "Horizontal, FillX" );
	lay.AddChild( lay4 );
	descripcion = app.CreateTextEdit( "", 1, -1 );
	descripcion.SetEnabled( false );
  lay4.AddChild( descripcion )
  lay3.Hide();
  lay4.Hide();
  lay5 = app.CreateLayout( "Linear", "Horizontal, VCenter, FillX" );
  lay5.SetSize( 1, 0.087 )
  lay5.SetBackGradient(  utils.GetGradientColors(color)[0], color,  utils.GetGradientColors(color)[1]);
	lay.AddChild( lay5 );
	lblCosto = app.CreateText( "Costo:", 0.5, -1 );
  lblPrecio= app.CreateText( "Precio:", 0.5, -1 );
  	lblCosto.SetFontFile( "Misc/TitilliumWeb-ExtraLight.ttf" );
	lblCosto.SetTextColor( "#ffffff" );
	lblCosto.SetTextShadow( 5,0,0,"#000000" )
		lblPrecio.SetFontFile( "Misc/TitilliumWeb-ExtraLight.ttf" );
	lblPrecio.SetTextColor( "#ffffff" );
	lblPrecio.SetTextShadow( 5,0,0,"#000000" )
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
	lay8 = app.CreateLayout( "Linear", "Horizontal, FillX" );
	lay.AddChild( lay8 );
	lay8.Hide();
	
	lblsuplidor = app.CreateText( "Suplidor:", 0.6, -1 );
	lay8.AddChild(  lblsuplidor);
	datsuplidor = app.CreateTextEdit( "", 0.4, -1 );
	datsuplidor.SetEnabled( false );
	lay8.AddChild( datsuplidor );
	
	lay9= app.CreateLayout( "Linear", "Horizontal, VCenter, FillX" );
	lay.AddChild( lay9 );
	lay9.SetSize( 1, 0.087 )
  lay9.SetBackGradient(  utils.GetGradientColors(color)[0], color,  utils.GetGradientColors(color)[1]);
	lay9.Hide();
	
	
	lbldepto = app.CreateText( "Depto:", 0.5, -1 );
	lbldepto.SetFontFile( "Misc/TitilliumWeb-ExtraLight.ttf" );
	lbldepto.SetTextColor( "#ffffff" );
	lbldepto.SetTextShadow( 5,0,0,"#000000" )
	lay9.AddChild( lbldepto );
	lblsubdepto = app.CreateText( "Sub-Depto:", 0.5, -1 );
	lblsubdepto.SetFontFile( "Misc/TitilliumWeb-ExtraLight.ttf" );
	lblsubdepto.SetTextColor( "#ffffff" );
	lblsubdepto.SetTextShadow( 5,0,0,"#000000" )
	lay9.AddChild( lblsubdepto );
	
		
	lay10= app.CreateLayout( "Linear", "Horizontal, VCenter, FillX" );
	lay.AddChild( lay10 );
	lay10.Hide();
	datDepto= app.CreateTextEdit( "", 0.5, -1 );
  datSubDepto= app.CreateTextEdit( "", 0.5, -1 );
  datDepto.SetEnabled( false );
  datSubDepto.SetEnabled( false );
  lay10.AddChild( datDepto );
  lay10.AddChild( datSubDepto );
	
	app.AddLayout( lay );
	MoveDatabase();
	//OpenDatabase();
}


function ClearLayout()
{
	lay3.Hide();
	lay4.Hide();
	lay5.Hide();
	lay6.Hide();
	lay7.Hide();
}

function SearchProduct()
{

	db = app.OpenDatabase( dbProd );
	//app.ShowPopup( "Database is ready." );
	db.ExecuteSql("SELECT * FROM INVENTARIO WHERE Num_Producto = '" + numprod.GetText() + "'",[], OnResult);
}

function SearchProduct2()
{

	db = app.OpenDatabase( dbProd );
	//app.ShowPopup( "Database is ready." );
	db.ExecuteSql("SELECT * FROM INVENTARIO WHERE Num_Producto = '" + numprod2.GetText() + "'",[], OnResult);
}

//Callback to show query results in debug.  
function OnResult2( results )   
{  
    var s = "";  
    var len = results.rows.length;  
    for(var i = 0; i < len; i++ )   
    {  
        var item = results.rows.item(i)  
        s += "," + item.Num_Producto;   
    }  
    numprod2.SetList( numprod2.GetText()+s )
}  

//Callback to show errors.  
function OnError( msg )   
{  
    app.Alert( "Error: " + msg )  
    console.log( "Error: " + msg )  
}

function OnResult( results )   
{  
    app.ShowProgress( "Searching ..." );
    //var s = "";  
    //var len = results.rows.length;  
    var item = results.rows.item(0);
    numprod.SetText( "" );
    
    numprod2.SetList( item.Num_Producto );
    db.ExecuteSql("SELECT Num_Producto  FROM INVENTARIO ORDER BY Num_Producto ASC",[], OnResult2);
    descripcion.SetText( item.Descripcion );
    datCosto.SetText( item.Costo );
    datPrecio.SetText( item.Precio );
    datdisponible.SetText( item.Cantidad_Disponible );
    datsuplidor.SetText( item.Suplidor )
    datDepto.SetText( item.Num_Depto );
    datSubDepto.SetText(item.Num_Sub_Depto);
    app.HideProgress();
    lay3.Animate( "SlideFromLeft" );
    lay4.Animate( "SlideFromRight" );
    lay5.Animate( "SlideFromTop" );
    lay6.Animate( "SlideFromBottom" );
    lay7.Animate( "Rubberband" );
    lay8.Animate( "Tada" );
    lay9.Animate( "Bounce" );
    lay10.Animate( "Swing" );
    //btnaddremove.Focus()
    //numprod.ClearFocus();
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