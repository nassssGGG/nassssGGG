/* AutoPièces DZ — TecDoc System v2 — Site-wide vehicle memory */
(function(){
'use strict';
var STORE_KEY='pdz_vehicle';

var VDB={
"Alfa Romeo":{
"147 (2001-2010)":["1.4 TS 90cv","1.6 TS 105cv","1.6 TS 120cv","1.8 TS 144cv","2.0 TS 150cv","1.9 JTD 100cv","1.9 JTD 115cv","1.9 JTD 140cv"],
"156 (1997-2005)":["1.6 TS 120cv","1.8 TS 144cv","2.0 TS 155cv","2.5 V6 192cv","1.9 JTD 105cv","1.9 JTD 115cv","2.4 JTD 140cv","2.4 JTD 175cv"],
"159 (2005-2011)":["1.8 MPI 140cv","1.9 JTDM 120cv","1.9 JTDM 150cv","2.0 JTDM 170cv","2.2 JTS 185cv","3.2 V6 260cv"],
"Giulietta (2010-2020)":["1.4 TB 105cv","1.4 TB 120cv","1.4 TB 170cv","1.6 JTDM 105cv","1.6 JTDM 120cv","2.0 JTDM 140cv","2.0 JTDM 175cv"],
"MiTo (2008-2018)":["1.4 78cv","1.4 TB 120cv","1.4 TB 105cv","1.3 JTDm 85cv","1.6 JTDm 120cv"],
"GT (2004-2010)":["1.8 TS 140cv","2.0 JTS 165cv","3.2 V6 240cv","1.9 JTD 150cv"]
},
"Audi":{
"A1 8X (2010-2018)":["1.2 TFSI 86cv","1.4 TFSI 122cv","1.6 TDI 90cv","1.6 TDI 105cv","2.0 TDI 143cv","1.4 TFSI 185cv"],
"A3 8L (1996-2003)":["1.6 101cv","1.8 125cv","1.8 T 150cv","1.9 TDI 90cv","1.9 TDI 110cv","1.9 TDI 130cv","2.0 TDI 140cv"],
"A3 8P (2003-2012)":["1.6 102cv","1.6 FSI 115cv","2.0 FSI 150cv","2.0 TFSI 200cv","1.9 TDI 105cv","2.0 TDI 140cv","2.0 TDI 170cv","3.2 V6 250cv"],
"A3 8V (2012-2020)":["1.2 TFSI 105cv","1.4 TFSI 122cv","1.4 TFSI 140cv","1.8 TFSI 180cv","2.0 TDI 110cv","2.0 TDI 150cv","2.0 TFSI 300cv S3"],
"A4 B5 (1994-2001)":["1.6 100cv","1.8 125cv","1.8 T 150cv","1.8 T 180cv","2.4 V6 165cv","2.8 V6 193cv","1.9 TDI 90cv","1.9 TDI 110cv","1.9 TDI 115cv"],
"A4 B6 (2000-2004)":["1.6 102cv","1.8 T 163cv","2.0 FSI 130cv","2.4 170cv","3.0 220cv","1.9 TDI 101cv","1.9 TDI 130cv","2.5 TDI 155cv","2.5 TDI 180cv"],
"A4 B7 (2004-2008)":["1.8 T 163cv","2.0 FSI 150cv","2.0 TFSI 200cv","3.0 218cv","3.2 FSI 255cv","2.0 TDI 140cv","2.7 TDI 180cv","3.0 TDI 204cv"],
"A4 B8 (2007-2015)":["1.8 TFSI 120cv","1.8 TFSI 160cv","2.0 TFSI 211cv","3.0 TFSI 272cv","2.0 TDI 120cv","2.0 TDI 143cv","2.0 TDI 177cv","3.0 TDI 204cv","3.0 TDI 245cv"],
"A6 C5 (1997-2005)":["1.8 T 150cv","2.4 165cv","2.7 biT 250cv","3.0 220cv","4.2 V8 300cv","1.9 TDI 130cv","2.5 TDI 155cv","2.5 TDI 180cv"],
"A6 C6 (2004-2011)":["2.0 TFSI 170cv","2.4 177cv","2.8 FSI 210cv","3.2 FSI 255cv","4.2 V8 350cv","2.0 TDI 140cv","2.7 TDI 180cv","3.0 TDI 225cv"],
"Q5 (2008-2017)":["2.0 TFSI 180cv","2.0 TFSI 211cv","3.2 FSI 270cv","2.0 TDI 143cv","2.0 TDI 170cv","3.0 TDI 239cv"],
"TT (1998-2014)":["1.8 T 150cv","1.8 T 180cv","1.8 T 225cv","3.2 V6 250cv","2.0 TFSI 200cv","2.0 TDI 140cv"]
},
"BMW":{
"Serie 1 E87 (2004-2011)":["116i 115cv","118i 143cv","120i 163cv","123d 204cv","116d 115cv","118d 143cv","120d 163cv","130i 265cv"],
"Serie 1 F20 (2011-2019)":["114i 102cv","116i 136cv","118i 136cv","120i 184cv","116d 116cv","118d 143cv","120d 184cv"],
"Serie 3 E46 (1998-2006)":["316i 115cv","318i 118cv","320i 170cv","323i 170cv","325i 192cv","328i 193cv","330i 231cv","318d 116cv","320d 150cv","330d 204cv"],
"Serie 3 E90 (2005-2012)":["316i 122cv","318i 143cv","320i 170cv","323i 177cv","325i 218cv","328i 245cv","330i 272cv","316d 116cv","318d 143cv","320d 163cv","325d 197cv"],
"Serie 3 F30 (2011-2019)":["316i 136cv","318i 136cv","320i 184cv","328i 245cv","330i 252cv","316d 116cv","318d 143cv","320d 184cv","330d 258cv"],
"Serie 5 E60 (2003-2010)":["520i 170cv","523i 177cv","525i 218cv","530i 272cv","535i 305cv","520d 163cv","525d 197cv","530d 231cv"],
"Serie 5 F10 (2009-2016)":["520i 184cv","523i 204cv","528i 245cv","530i 272cv","518d 143cv","520d 184cv","525d 204cv","530d 258cv"],
"X1 E84 (2009-2015)":["sDrive18i 150cv","sDrive20i 184cv","xDrive20i 184cv","sDrive16d 116cv","sDrive18d 143cv","xDrive18d 143cv","xDrive20d 184cv"],
"X3 E83 (2003-2010)":["2.0i 150cv","2.5i 192cv","3.0i 231cv","2.0d 150cv","2.5d 177cv","3.0d 218cv"],
"X5 E53 (1999-2006)":["3.0i 231cv","4.4i 286cv","4.6iS 347cv","3.0d 184cv","3.0d 218cv"]
},
"Chevrolet":{
"Aveo T250 (2006-2011)":["1.2 72cv","1.4 94cv","1.4 16v 100cv","1.6 115cv","1.4 TD 75cv"],
"Aveo T300 (2011-2017)":["1.2 86cv","1.4 100cv","1.6 115cv","1.3 D 75cv","1.7 D 130cv"],
"Captiva (2006-2018)":["2.0 140cv","2.4 140cv","3.2 V6 230cv","2.0 VCDi 120cv","2.0 VCDi 150cv","2.2 D 163cv"],
"Cruze (2009-2016)":["1.6 124cv","1.8 141cv","2.0 VCDi 150cv","1.4 T 140cv","1.7 D 130cv"],
"Lacetti (2004-2013)":["1.4 95cv","1.6 109cv","1.8 122cv","2.0 D 121cv"],
"Matiz (1998-2010)":["0.8 51cv","1.0 65cv"],
"Nexia (1994-2016)":["1.5 SOHC 8v 80cv","1.5 DOHC 16v 90cv","1.6 90cv"],
"Nubira (2003-2010)":["1.6 109cv","1.8 122cv","2.0 TDi 121cv"],
"Spark (2010-2015)":["1.0 68cv","1.2 80cv","1.0 D 70cv"]
},
"Citroen":{
"AX (1986-1998)":["1.1 55cv","1.4 75cv","1.5 D 55cv"],
"C1 I (2005-2014)":["1.0 68cv","1.4 75cv","1.4 HDI 54cv"],
"C1 II (2014-)":["1.0 VTi 68cv","1.2 PureTech 82cv"],
"C2 (2003-2010)":["1.1 60cv","1.4 73cv","1.6 VTS 122cv","1.4 HDI 70cv"],
"C3 I (2002-2009)":["1.1 60cv","1.4 75cv","1.6 16v 110cv","1.4 HDI 70cv","1.6 HDI 90cv","1.6 HDI 110cv"],
"C3 II (2009-2016)":["1.2 VTi 82cv","1.4 VTi 95cv","1.6 VTi 120cv","1.4 HDI 70cv","1.6 HDI 90cv","1.6 HDI 110cv"],
"C3 III (2016-)":["1.2 PureTech 68cv","1.2 PureTech 82cv","1.2 PureTech 110cv","1.6 BlueHDI 75cv","1.6 BlueHDI 100cv"],
"C4 I (2004-2011)":["1.4 90cv","1.6 16v 110cv","2.0 143cv","1.6 HDI 90cv","1.6 HDI 110cv","2.0 HDI 136cv","2.0 HDI 150cv"],
"C4 II (2011-2018)":["1.2 PureTech 130cv","1.6 VTi 120cv","2.0 155cv","1.6 BlueHDI 120cv","2.0 BlueHDI 150cv"],
"C5 I (2001-2008)":["1.8 125cv","2.0 140cv","2.2 158cv","3.0 V6 211cv","1.6 HDI 110cv","2.0 HDI 110cv","2.0 HDI 138cv","2.2 HDI 133cv"],
"C5 II (2008-2017)":["1.6 THP 155cv","2.0 143cv","1.6 HDI 110cv","2.0 HDI 140cv","2.0 HDI 163cv","2.7 HDI V6 204cv"],
"Berlingo I (1996-2008)":["1.4 75cv","1.6 16v 110cv","2.0 90cv","1.6 HDI 90cv","1.9 D 70cv"],
"Berlingo II (2008-2018)":["1.2 PureTech 110cv","1.6 VTi 95cv","1.6 HDI 90cv","1.6 HDI 115cv","BlueHDI 100cv"],
"Xsara (1997-2004)":["1.4 75cv","1.6 97cv","1.8 101cv","2.0 136cv","1.4 HDI 75cv","1.6 HDI 90cv","2.0 HDI 90cv"],
"Xsara Picasso (1999-2010)":["1.6 16v 109cv","1.8 115cv","2.0 136cv","1.6 HDI 92cv","2.0 HDI 92cv","2.0 HDI 109cv"],
"ZX (1991-1998)":["1.4i 75cv","1.6i 88cv","1.8i 103cv","2.0i 132cv","1.9 D 68cv","1.9 TD 90cv"]
},
"Dacia":{
"Duster I (2010-2017)":["1.6 MPI 105cv","1.6 SCe 115cv","2.0 MPI 140cv","1.5 DCi 85cv","1.5 DCi 90cv","1.5 DCi 107cv","1.5 DCi 110cv 4x4"],
"Duster II (2017-)":["1.6 SCe 115cv","1.3 TCe 125cv","1.3 TCe 150cv","1.5 Blue DCi 85cv","1.5 Blue DCi 95cv","1.5 Blue DCi 115cv"],
"Logan I (2004-2012)":["1.4 MPI 75cv","1.6 MPI 87cv","1.6 MPI 105cv","1.5 DCi 65cv","1.5 DCi 68cv","1.5 DCi 86cv","1.5 DCi 90cv"],
"Logan II (2012-)":["0.9 TCe 90cv","1.2 75cv","1.6 MPI 85cv","1.6 SCe 100cv","1.5 DCi 75cv","1.5 DCi 90cv","1.5 DCi 105cv"],
"Logan MCV I (2006-2013)":["1.4 MPI 75cv","1.6 MPI 87cv","1.6 MPI 105cv","1.5 DCi 68cv","1.5 DCi 86cv","1.5 DCi 90cv"],
"Sandero I (2008-2012)":["1.2 16v 75cv","1.4 MPI 75cv","1.6 MPI 87cv","1.6 MPI 105cv","1.5 DCi 65cv","1.5 DCi 68cv","1.5 DCi 86cv"],
"Sandero II (2012-)":["0.9 TCe 90cv","1.2 75cv","1.6 MPI 85cv","1.6 SCe 100cv","1.5 DCi 75cv","1.5 DCi 90cv"],
"Sandero Stepway":["1.6 MPI 87cv","0.9 TCe 90cv","1.5 DCi 90cv","1.5 DCi 107cv"],
"Lodgy (2012-)":["1.2 TCe 115cv","1.6 MPI 85cv","1.6 SCe 100cv","1.5 DCi 90cv","1.5 DCi 107cv","1.5 DCi 110cv"],
"Dokker (2012-)":["1.2 TCe 115cv","1.6 MPI 85cv","1.5 DCi 75cv","1.5 DCi 90cv"]
},
"Fiat":{
"500 (2007-)":["1.2 69cv","1.4 100cv","1.3 Multijet 75cv","1.3 Multijet 95cv","0.9 TwinAir 85cv","0.9 TwinAir 105cv"],
"Bravo I (1995-2001)":["1.4 80cv","1.6 103cv","1.8 113cv","2.0 HGT 155cv","1.9 JTD 105cv"],
"Bravo II (2007-2014)":["1.4 90cv","1.4 T-Jet 150cv","1.6 105cv","1.8 140cv","1.6 Multijet 105cv","1.9 Multijet 120cv","2.0 Multijet 165cv"],
"Grande Punto (2005-2012)":["1.2 65cv","1.4 77cv","1.4 T-Jet 120cv","1.3 Multijet 75cv","1.3 Multijet 90cv","1.9 Multijet 130cv"],
"Punto III (2012-)":["1.2 69cv","1.4 77cv","0.9 TwinAir 85cv","1.3 Multijet 75cv","1.3 Multijet 85cv"],
"Linea (2007-2015)":["1.4 77cv","1.4 T-Jet 120cv","1.3 Multijet 90cv","1.9 Multijet 120cv"],
"Doblo I (2001-2009)":["1.2 65cv","1.6 105cv","1.9 JTD 100cv","1.3 Multijet 84cv"],
"Doblo II (2009-)":["1.4 95cv","1.6 105cv","1.3 Multijet 90cv","1.6 Multijet 105cv","2.0 Multijet 135cv"],
"Stilo (2001-2007)":["1.2 80cv","1.4 95cv","1.6 103cv","1.8 133cv","2.4 170cv","1.9 JTD 80cv","1.9 JTD 100cv","1.9 JTD 115cv"],
"Tipo (2015-)":["1.4 95cv","1.4 T-Jet 120cv","1.6 110cv","1.3 Multijet 95cv","1.6 Multijet 120cv","2.0 Multijet 150cv"],
"Marea (1996-2002)":["1.6 103cv","1.8 113cv","2.0 HLX 155cv","1.9 JTD 105cv","2.4 JTD 130cv"]
},
"Ford":{
"Fiesta V (2001-2008)":["1.3 70cv","1.4 80cv","1.6 100cv","1.6 ST 150cv","1.4 TDCi 68cv","1.6 TDCi 100cv"],
"Fiesta VI (2008-2017)":["1.25 60cv","1.25 82cv","1.4 96cv","1.6 120cv","1.0 EcoBoost 100cv","1.0 EcoBoost 125cv","1.4 TDCi 68cv","1.6 TDCi 95cv"],
"Focus I (1998-2004)":["1.4 75cv","1.6 100cv","1.8 115cv","2.0 130cv","2.0 ST170cv","1.8 TDCi 100cv","1.6 TDCi 90cv"],
"Focus II (2004-2011)":["1.4 80cv","1.6 100cv","1.6 115cv","2.0 145cv","2.5 ST 225cv","1.6 TDCi 90cv","1.6 TDCi 109cv","1.8 TDCi 115cv","2.0 TDCi 136cv"],
"Focus III (2011-2018)":["1.0 EcoBoost 100cv","1.0 EcoBoost 125cv","1.6 105cv","1.6 125cv","2.0 ST 250cv","1.5 TDCi 95cv","1.5 TDCi 120cv","2.0 TDCi 150cv"],
"Mondeo III (2000-2007)":["1.8 125cv","2.0 145cv","2.5 V6 170cv","3.0 V6 204cv","2.0 TDCi 115cv","2.0 TDCi 130cv","2.2 TDCi 155cv"],
"Mondeo IV (2007-2014)":["1.6 125cv","2.0 145cv","2.0 EcoBoost 203cv","2.0 TDCi 115cv","2.0 TDCi 130cv","2.0 TDCi 140cv","2.2 TDCi 200cv"],
"Ka (1996-2016)":["1.3 70cv","1.6 94cv","1.3 D 70cv"],
"C-Max I (2003-2010)":["1.6 115cv","1.8 125cv","2.0 145cv","1.6 TDCi 90cv","1.6 TDCi 109cv","1.8 TDCi 115cv","2.0 TDCi 136cv"],
"Ranger (2006-)":["2.2 TDCi 125cv","2.2 TDCi 150cv","3.2 TDCi 200cv","2.5 TDCi 105cv","2.5 TDCi 143cv"],
"Transit VI (2006-2014)":["2.2 TDCi 85cv","2.2 TDCi 110cv","2.2 TDCi 140cv","2.4 TDCi 100cv","2.4 TDCi 115cv"]
},
"Honda":{
"Accord VI (1997-2002)":["1.8 136cv","2.0 150cv","2.4 160cv","3.0 V6 200cv","2.0 TDI 105cv"],
"Accord VII (2003-2008)":["2.0 155cv","2.4 190cv","3.0 V6 209cv","2.2 iDTEC 140cv"],
"Civic EK (1995-2001)":["1.4 75cv","1.5 115cv","1.6 125cv","1.6 VTi 170cv"],
"Civic EP (2001-2005)":["1.4 90cv","1.6 110cv","2.0 Type R 200cv","1.7 CDTi 100cv"],
"Civic FD (2005-2011)":["1.4 83cv","1.8 140cv","2.0 Type R 201cv","2.2 iDTEC 140cv"],
"CR-V II (2001-2006)":["2.0 150cv","2.0 VTEC 147cv","2.4 160cv","2.2 iDTEC 140cv"],
"CR-V III (2006-2012)":["2.0 150cv","2.4 VTEC 166cv","2.2 iDTEC 140cv","2.2 iDTEC 150cv"],
"Jazz I (2002-2008)":["1.2 78cv","1.4 83cv","1.5 VTEC 122cv"],
"Jazz II (2008-2015)":["1.2 90cv","1.4 100cv","1.3 iDSI 95cv"],
"HR-V (1998-2006)":["1.6 105cv","1.6 VTEC 125cv"]
},
"Hyundai":{
"Accent (2005-2011)":["1.4 97cv","1.6 110cv","1.5 CRDi 82cv","1.6 CRDi 115cv"],
"Atos (1997-2008)":["1.0 55cv","1.1 63cv"],
"Elantra III XD (2000-2006)":["1.6 105cv","2.0 143cv","2.0 CRDi 113cv"],
"Elantra IV HD (2006-2011)":["1.6 122cv","2.0 143cv","1.6 CRDi 116cv"],
"Elantra V MD (2011-2016)":["1.6 132cv","2.0 150cv","1.6 CRDi 128cv"],
"Getz (2002-2010)":["1.1 62cv","1.3 85cv","1.4 97cv","1.6 106cv","1.5 CRDi 82cv","1.5 CRDi 88cv"],
"i10 I (2007-2013)":["1.1 67cv","1.2 78cv","1.0 CRDi 55cv"],
"i10 II (2013-2019)":["1.0 66cv","1.2 87cv","1.1 CRDi 55cv","1.0 T-GDI 100cv"],
"i20 I (2008-2014)":["1.2 78cv","1.4 100cv","1.6 126cv","1.2 CRDi 75cv","1.4 CRDi 90cv","1.6 CRDi 110cv"],
"i20 II (2014-2020)":["1.2 75cv","1.2 84cv","1.0 T-GDI 100cv","1.0 T-GDI 120cv","1.1 CRDi 75cv","1.4 CRDi 90cv"],
"i30 I FD (2007-2012)":["1.4 109cv","1.6 122cv","2.0 145cv","1.4 CRDi 90cv","1.6 CRDi 90cv","1.6 CRDi 115cv","2.0 CRDi 140cv"],
"i30 II GD (2012-2017)":["1.4 100cv","1.6 135cv","1.6 T-GDI 186cv","1.4 CRDi 90cv","1.6 CRDi 110cv","2.0 CRDi 136cv"],
"i30 III PD (2017-)":["1.0 T-GDI 120cv","1.4 T-GDI 140cv","1.5 T-GDI 160cv","1.6 CRDi 95cv","1.6 CRDi 115cv"],
"ix35 (2010-2015)":["1.6 135cv","2.0 163cv","2.0 4WD 163cv","1.7 CRDi 116cv","2.0 CRDi 136cv","2.0 CRDi 4WD 184cv"],
"Santa Fe I (2000-2006)":["2.4 150cv","2.7 V6 173cv","2.0 CRDi 113cv","2.2 CRDi 150cv"],
"Santa Fe II CM (2006-2012)":["2.0 156cv","2.7 V6 188cv","2.2 CRDi 155cv","2.2 CRDi 197cv"],
"Santa Fe III DM (2012-2018)":["2.0 GDI 150cv","2.4 GDI 175cv","2.0 CRDi 150cv","2.2 CRDi 197cv"],
"Sonata V NF (2005-2010)":["2.0 145cv","2.4 175cv","3.3 V6 235cv","2.0 CRDi 140cv"],
"Tucson I (2004-2010)":["2.0 144cv","2.7 V6 173cv","2.0 CRDi 113cv","2.0 CRDi 140cv"],
"Tucson II LM (2010-2015)":["1.6 135cv","2.0 163cv","1.7 CRDi 116cv","2.0 CRDi 136cv"],
"Tucson III TL (2015-)":["1.6 GDI 132cv","1.6 T-GDI 177cv","2.0 155cv","1.7 CRDi 115cv","2.0 CRDi 136cv","2.0 CRDi 185cv"],
"H-1 / Starex (2007-)":["2.4 174cv","2.5 CRDi 136cv","2.5 CRDi 170cv"]
},
"Jeep":{
"Cherokee XJ (1984-2001)":["2.5 125cv","4.0 184cv","2.1 TD 84cv","2.5 CRD 143cv"],
"Cherokee KJ (2001-2007)":["2.4 150cv","3.7 V6 204cv","2.5 CRD 143cv","2.8 CRD 163cv"],
"Compass (2006-2016)":["2.0 156cv","2.4 172cv","2.2 CRD 163cv"],
"Grand Cherokee WJ (1999-2004)":["3.1 TD 140cv","4.0 190cv","4.7 V8 222cv"],
"Grand Cherokee WK (2004-2010)":["3.7 V6 213cv","4.7 V8 230cv","5.7 V8 330cv","3.0 CRD 218cv"],
"Renegade (2014-)":["1.4 MultiAir 110cv","1.4 MultiAir 140cv","1.6 E-Torq 110cv","1.6 MultiJet 120cv","2.0 MultiJet 140cv"],
"Wrangler JK (2007-)":["3.8 V6 202cv","3.6 V6 284cv","2.8 CRD 200cv"]
},
"Kia":{
"Ceed I ED (2006-2012)":["1.4 80cv","1.4 105cv","1.6 122cv","2.0 143cv","1.4 CRDi 90cv","1.6 CRDi 90cv","1.6 CRDi 115cv","2.0 CRDi 140cv"],
"Ceed II JD (2012-2018)":["1.4 100cv","1.6 135cv","1.6 T-GDI 201cv","1.4 CRDi 90cv","1.6 CRDi 110cv","1.6 CRDi 136cv"],
"Cerato (2004-2009)":["1.6 105cv","2.0 143cv","1.5 CRDi 88cv","2.0 CRDi 113cv"],
"Magentis (2001-2010)":["2.0 141cv","2.5 V6 165cv","2.0 CRDi 113cv","2.0 CRDi 140cv"],
"Picanto I (2004-2011)":["1.0 65cv","1.1 65cv","1.1 CRDi 75cv"],
"Picanto II (2011-2017)":["1.0 69cv","1.2 85cv","1.1 CRDi 75cv"],
"Rio II (2005-2011)":["1.4 97cv","1.6 110cv","1.5 CRDi 82cv","1.5 CRDi 88cv","1.6 CRDi 115cv"],
"Rio III UB (2011-2017)":["1.2 84cv","1.4 107cv","1.6 123cv","1.1 CRDi 75cv","1.4 CRDi 90cv"],
"Sorento I (2002-2009)":["2.4 139cv","3.5 V6 192cv","2.5 CRDi 140cv","2.5 CRDi 163cv"],
"Sorento II XM (2009-2015)":["2.0 MPI 150cv","2.4 GDI 175cv","3.5 V6 270cv","2.0 CRDi 150cv","2.2 CRDi 197cv"],
"Soul I (2009-2014)":["1.6 124cv","2.0 143cv","1.6 CRDi 128cv"],
"Sportage II (2004-2010)":["2.0 140cv","2.7 V6 175cv","2.0 CRDi 113cv","2.0 CRDi 141cv"],
"Sportage III SL (2010-2016)":["1.6 GDI 135cv","2.0 163cv","2.0 4WD 163cv","1.7 CRDi 115cv","2.0 CRDi 136cv","2.0 CRDi 184cv"],
"Sportage IV QL (2016-)":["1.6 GDI 132cv","1.6 T-GDI 177cv","2.0 163cv","1.7 CRDi 115cv","2.0 CRDi 136cv","2.0 CRDi 185cv"]
},
"Lada":{
"Niva 1600 (1977-2019)":["1.6 8v 80cv","1.6 8v carbu 82cv"],
"Niva 1700 (1994-)":["1.7 8v 80cv","1.7 8v injection 84cv"],
"Samara 2108/09 (1984-2004)":["1.1 54cv","1.3 65cv","1.5 78cv"],
"Kalina (2004-2018)":["1.4 89cv","1.6 8v 81cv","1.6 16v 98cv"],
"Priora (2007-2018)":["1.6 8v 81cv","1.6 16v 98cv"],
"Granta (2011-)":["1.6 8v 87cv","1.6 16v 106cv"],
"Vesta (2015-)":["1.6 8v 87cv","1.6 16v 106cv","1.8 122cv"],
"Largus (2012-)":["1.6 8v 87cv","1.6 16v 102cv","1.5 dCi 90cv"]
},
"Land Rover":{
"Defender (1983-2016)":["2.5 TD5 122cv","2.4 TDCi 122cv","2.2 TDCi 122cv","3.9 V8 182cv","2.5 TDi 112cv"],
"Discovery II (1998-2004)":["4.0 V8 190cv","2.5 TD5 139cv"],
"Discovery III (2004-2009)":["2.7 TDV6 190cv","4.0 V6 218cv","4.4 V8 299cv"],
"Freelander I (1997-2006)":["1.8 120cv","2.5 V6 177cv","2.0 TD4 112cv"],
"Freelander II (2006-2014)":["2.2 TD4 150cv","2.2 SD4 190cv","3.2 Si6 232cv"],
"Range Rover III (2001-2012)":["4.4 V8 299cv","3.0 TDV6 190cv","4.4 TDV8 313cv"],
"Range Rover Sport I (2005-2013)":["2.7 TDV6 190cv","3.0 TDV6 245cv","4.2 V8 390cv","5.0 V8 510cv"]
},
"Mazda":{
"Mazda 2 DY (2003-2007)":["1.25 75cv","1.4 80cv","1.6 101cv","1.4 MZ-CD 68cv"],
"Mazda 2 DE (2007-2014)":["1.3 75cv","1.5 103cv","1.6 MZ-CD 90cv"],
"Mazda 3 BK (2003-2009)":["1.4 84cv","1.6 105cv","2.0 150cv","2.3 MPS 260cv","1.6 MZ-CD 90cv","2.0 MZ-CD 143cv"],
"Mazda 3 BL (2009-2014)":["1.6 105cv","2.0 150cv","2.5 167cv","1.6 MZ-CD 115cv","2.2 MZ-CD 150cv","2.2 MZ-CD 185cv"],
"Mazda 6 GG (2002-2007)":["1.8 120cv","2.0 141cv","2.3 166cv","2.0 MZ-CD 143cv"],
"Mazda 6 GH (2007-2012)":["1.8 120cv","2.0 155cv","2.5 170cv","2.0 MZ-CD 140cv","2.2 MZ-CD 163cv","2.2 MZ-CD 185cv"],
"CX-5 (2012-)":["2.0 Skyactiv 165cv","2.5 Skyactiv 192cv","2.2 SkyD 150cv","2.2 SkyD 175cv"],
"MX-5 (2005-2014)":["1.8 126cv","2.0 160cv"]
},
"Mercedes-Benz":{
"Classe A W168 (1997-2004)":["1.4 82cv","1.6 102cv","1.9 125cv","1.7 CDI 75cv","1.7 CDI 95cv"],
"Classe A W169 (2004-2012)":["1.5 95cv","1.7 116cv","2.0 136cv","2.0 Turbo 193cv","1.5 CDI 82cv","2.0 CDI 109cv"],
"Classe A W176 (2012-2018)":["1.6 122cv","2.0 Turbo 211cv","1.5 CDI 109cv","2.2 CDI 136cv","2.2 CDI 170cv"],
"Classe B W245 (2005-2011)":["1.5 95cv","1.7 116cv","2.0 136cv","2.0 Turbo 193cv","1.5 CDI 82cv","2.0 CDI 109cv"],
"Classe B W246 (2011-2018)":["1.6 122cv","2.0 155cv","1.5 CDI 109cv","1.8 CDI 109cv","2.2 CDI 136cv","2.2 CDI 170cv"],
"Classe C W202 (1993-2000)":["1.8 122cv","2.0 136cv","2.2 150cv","2.8 193cv","2.2 CDI 125cv"],
"Classe C W203 (2000-2007)":["1.8 K 143cv","2.0 136cv","2.2 150cv","2.8 193cv","3.2 218cv","1.8 CDI 115cv","2.0 CDI 122cv","2.2 CDI 143cv","3.0 CDI 177cv"],
"Classe C W204 (2007-2014)":["1.8 K 156cv","2.5 204cv","3.5 272cv","2.2 CDI 136cv","2.2 CDI 170cv","3.0 CDI 204cv","3.0 CDI 231cv"],
"Classe E W210 (1995-2002)":["1.8 122cv","2.0 136cv","2.4 170cv","2.8 204cv","3.2 224cv","2.2 CDI 125cv","2.9 TD 150cv","3.2 CDI 197cv"],
"Classe E W211 (2002-2009)":["1.8 K 163cv","2.6 177cv","3.5 272cv","5.0 306cv","2.0 CDI 136cv","2.2 CDI 150cv","3.0 CDI 211cv"],
"Classe E W212 (2009-2016)":["1.8 CGI 204cv","2.0 Turbo 184cv","3.0 252cv","3.5 306cv","2.0 CDI 136cv","2.2 CDI 170cv","3.0 CDI 231cv","3.0 CDI 265cv"],
"ML W163 (1997-2005)":["2.7 CDI 163cv","3.2 218cv","4.3 272cv","5.0 292cv"],
"ML W164 (2005-2011)":["280 190cv","320 CDI 224cv","350 235cv","420 CDI 306cv"],
"Sprinter I (1995-2006)":["2.1 CDI 82cv","2.1 CDI 109cv","2.9 TD 122cv","2.7 CDI 129cv"],
"Sprinter II (2006-)":["2.1 CDI 109cv","2.1 CDI 129cv","2.1 CDI 150cv","3.0 CDI 188cv","3.0 CDI 211cv"],
"Vito W638 (1996-2003)":["2.2 CDI 102cv","2.2 CDI 122cv","2.3 98cv"],
"Vito W639 (2003-2014)":["2.2 CDI 136cv","3.0 CDI 224cv","3.5 V6 231cv"]
},
"Mitsubishi":{
"Carisma (1995-2004)":["1.3 75cv","1.6 100cv","1.8 116cv","1.9 DI-D 102cv"],
"Colt Z30 (2004-2012)":["1.1 75cv","1.3 95cv","1.5 109cv","1.5 Turbo 150cv","1.5 DI-D 95cv"],
"Galant (1997-2003)":["2.0 133cv","2.5 V6 163cv","2.0 Di-D 136cv"],
"L200 III (1996-2005)":["2.5 TDI 99cv","2.5 TDI 115cv","3.0 V6 177cv"],
"L200 IV (2005-2015)":["2.5 TDI 136cv","2.5 DI-D 178cv","3.2 DI-D 165cv"],
"Lancer (2003-2017)":["1.3 86cv","1.6 98cv","2.0 150cv","2.0 Evolution 280cv","2.0 Di-D 140cv"],
"Outlander I (2001-2006)":["2.0 136cv","2.4 4WD 160cv","2.0 TDI 115cv"],
"Outlander II (2006-2012)":["2.0 145cv","2.4 170cv","2.2 DI-D 156cv"],
"Pajero III (1999-2006)":["3.5 V6 202cv","2.5 TDI 115cv","3.2 DI-D 160cv","3.2 DI-D 165cv"],
"Pajero IV (2006-)":["3.2 DI-D 200cv","3.8 V6 248cv","3.0 V6 178cv"],
"Space Star (2012-)":["1.0 71cv","1.2 80cv"]
},
"Nissan":{
"Almera N16 (2000-2006)":["1.5 98cv","1.8 116cv","1.5 dCi 82cv","2.2 dCi 136cv"],
"Juke (2010-)":["1.6 117cv","1.6 DIG-T 200cv","1.5 dCi 110cv"],
"Micra K12 (2002-2010)":["1.0 65cv","1.2 80cv","1.4 88cv","1.5 dCi 65cv","1.5 dCi 82cv"],
"Micra K13 (2010-2017)":["1.2 80cv","1.5 dCi 90cv"],
"Note E11 (2005-2013)":["1.4 88cv","1.6 110cv","1.5 dCi 86cv","1.5 dCi 90cv"],
"Pathfinder R51 (2005-2014)":["2.5 dCi 174cv","3.0 dCi 231cv","4.0 V6 269cv"],
"Primera P11 (1996-2002)":["1.6 99cv","1.8 114cv","2.0 130cv","2.2 Di 115cv"],
"Primera P12 (2002-2008)":["1.6 109cv","1.8 122cv","2.0 140cv","1.9 dCi 120cv","2.2 dCi 136cv"],
"Qashqai I J10 (2006-2013)":["1.6 115cv","2.0 141cv","1.5 dCi 106cv","1.6 dCi 130cv","2.0 dCi 150cv"],
"Qashqai II J11 (2013-)":["1.2 DIG-T 115cv","1.6 DIG-T 163cv","1.5 dCi 110cv","1.6 dCi 130cv"],
"Terrano II R20 (1993-2006)":["2.4 125cv","2.7 TDI 101cv","3.0 Di 146cv"],
"X-Trail I T30 (2001-2007)":["2.0 140cv","2.5 165cv","2.2 Di 114cv","2.2 dCi 136cv"],
"X-Trail II T31 (2007-2014)":["2.0 141cv","2.5 4WD 169cv","2.0 dCi 150cv","2.0 dCi 173cv"]
},
"Opel":{
"Agila A (2000-2007)":["1.0 65cv","1.2 75cv","1.2 80cv","1.7 DTI 65cv"],
"Astra F (1991-1998)":["1.4 60cv","1.6 75cv","1.8 115cv","2.0 GSI 150cv","1.7 TD 68cv","1.7 TD 82cv"],
"Astra G (1998-2004)":["1.2 65cv","1.6 75cv","1.8 116cv","2.0 Turbo OPC 200cv","1.7 DTI 75cv","2.0 DTI 101cv"],
"Astra H (2004-2010)":["1.4 90cv","1.6 115cv","1.8 140cv","2.0 OPC 240cv","1.3 CDTi 90cv","1.7 CDTi 100cv","1.9 CDTi 120cv","1.9 CDTi 150cv"],
"Astra J (2009-2015)":["1.4 Turbo 100cv","1.4 Turbo 140cv","1.6 180cv","1.3 CDTi 95cv","1.7 CDTi 110cv","2.0 CDTi 165cv"],
"Corsa B (1993-2000)":["1.0 45cv","1.2 65cv","1.4 90cv","1.5 TD 67cv"],
"Corsa C (2000-2006)":["1.0 65cv","1.2 75cv","1.4 90cv","1.3 CDTi 70cv","1.7 DTI 75cv"],
"Corsa D (2006-2014)":["1.0 65cv","1.2 80cv","1.4 100cv","1.6 OPC 192cv","1.3 CDTi 75cv","1.3 CDTi 90cv"],
"Insignia (2008-2017)":["1.6 180cv","1.8 140cv","2.0 Turbo 220cv","1.6 CDTi 136cv","2.0 CDTi 110cv","2.0 CDTi 130cv","2.0 CDTi 160cv"],
"Meriva A (2003-2010)":["1.4 90cv","1.6 105cv","1.7 CDTi 100cv","1.3 CDTi 75cv"],
"Mokka (2012-2016)":["1.4 Turbo 140cv","1.6 115cv","1.7 CDTi 130cv"],
"Vectra C (2002-2008)":["1.6 105cv","1.8 140cv","2.0 Turbo 175cv","3.2 V6 211cv","1.9 CDTi 120cv","1.9 CDTi 150cv"],
"Zafira A (1999-2005)":["1.6 101cv","1.8 125cv","2.0 OPC 200cv","2.0 DTI 101cv","2.2 DTI 125cv"],
"Zafira B (2005-2014)":["1.6 105cv","1.8 140cv","2.0 OPC 240cv","1.7 CDTi 110cv","1.9 CDTi 120cv","1.9 CDTi 150cv"]
},
"Peugeot":{
"106 (1991-2003)":["1.0 45cv","1.1 60cv","1.4 75cv","1.4 16v 88cv","1.6 8v 89cv","1.6 16v 101cv","1.5 D 58cv","1.4 HDI 75cv"],
"205 (1983-1998)":["1.1 55cv","1.4 75cv","1.6 GTI 115cv","1.9 GTI 130cv","1.8 D 60cv","1.9 D 70cv"],
"206 (1998-2010)":["1.1 60cv","1.4 75cv","1.6 110cv","2.0 16v 138cv","2.0 RC 177cv","1.4 HDI 70cv","1.6 HDI 110cv","2.0 HDI 90cv"],
"206+ (2009-2013)":["1.1 60cv","1.4 73cv","1.4 HDI 70cv"],
"207 (2006-2012)":["1.4 75cv","1.4 VTi 95cv","1.6 VTi 120cv","1.6 Turbo 150cv","1.6 RC 175cv","1.4 HDI 70cv","1.6 HDI 90cv","1.6 HDI 110cv"],
"207+ (2012-2015)":["1.4 VTi 95cv","1.6 VTi 120cv","1.4 HDI 70cv","1.6 HDI 92cv"],
"208 (2012-)":["1.0 VTi 68cv","1.2 VTi 82cv","1.2 PureTech 110cv","1.4 VTi 95cv","1.6 THP 156cv","1.4 e-HDI 68cv","1.6 BlueHDI 100cv","1.6 BlueHDI 120cv"],
"301 (2012-)":["1.2 VTi 72cv","1.2 PureTech 82cv","1.6 VTi 115cv","1.6 BlueHDI 92cv","1.6 HDI 92cv"],
"306 (1993-2002)":["1.4 75cv","1.6 100cv","1.8 101cv","2.0 135cv","2.0 S16 167cv","1.9 D 69cv","1.9 TD 90cv","2.0 HDI 90cv"],
"307 (2001-2008)":["1.4 75cv","1.6 109cv","2.0 140cv","2.0 RC 177cv","1.4 HDI 70cv","1.6 HDI 90cv","2.0 HDI 110cv","2.0 HDI 136cv"],
"308 I (2007-2013)":["1.4 VTi 95cv","1.6 VTi 120cv","2.0 150cv","1.6 Turbo 156cv","1.4 HDI 70cv","1.6 HDI 90cv","1.6 HDI 110cv","2.0 HDI 136cv"],
"308 II (2013-)":["1.2 PureTech 130cv","1.6 THP 125cv","1.6 THP 155cv","1.6 BlueHDI 100cv","1.6 BlueHDI 120cv","2.0 BlueHDI 150cv"],
"405 (1987-1997)":["1.4 80cv","1.6 92cv","1.8 101cv","2.0 117cv","1.9 D 70cv","1.9 TD 90cv"],
"406 (1995-2004)":["1.6 88cv","1.8 116cv","2.0 135cv","2.2 158cv","3.0 V6 194cv","1.9 D 69cv","1.9 TD 90cv","2.0 HDI 110cv","2.2 HDI 133cv"],
"407 (2004-2011)":["1.8 125cv","2.0 140cv","2.2 163cv","3.0 V6 211cv","2.0 HDI 110cv","2.0 HDI 136cv","2.0 HDI 163cv","2.7 HDI V6 204cv"],
"Partner I (1996-2008)":["1.4 75cv","1.6 110cv","1.4 HDI 68cv","1.9 D 68cv","2.0 HDI 90cv"],
"Partner II (2008-)":["1.6 VTi 95cv","1.6 HDI 75cv","1.6 HDI 92cv","BlueHDI 100cv"],
"Expert I (1994-2007)":["2.0 HDI 90cv","1.9 D 70cv","2.0 109cv"],
"Expert II (2007-)":["1.6 HDI 90cv","2.0 HDI 120cv","2.0 HDI 163cv"]
},
"Renault":{
"Clio I (1990-1998)":["1.1 54cv","1.2 58cv","1.4 75cv","1.8 95cv","1.8 Williams 137cv","1.9 D 65cv","1.9 DTi 80cv"],
"Clio II (1998-2012)":["1.0 58cv","1.2 75cv","1.2 16v 75cv","1.4 16v 98cv","1.6 16v 107cv","2.0 RS 172cv","1.5 dCi 65cv","1.5 dCi 82cv","1.9 D 64cv"],
"Clio III (2005-2012)":["1.2 16v 75cv","1.2 TCe 100cv","1.4 16v 100cv","1.6 16v 128cv","2.0 RS 197cv","1.5 dCi 68cv","1.5 dCi 85cv","1.5 dCi 106cv"],
"Clio IV (2012-)":["0.9 TCe 90cv","1.2 16v 75cv","1.2 TCe 120cv","1.6 RS 200cv","1.5 dCi 75cv","1.5 dCi 90cv","1.5 dCi 110cv"],
"Express (1985-2007)":["1.2 60cv","1.4 75cv","1.9 D 64cv","1.9 DTi 80cv"],
"Fluence (2010-)":["1.6 110cv","2.0 140cv","1.5 dCi 110cv","1.6 dCi 130cv"],
"Kangoo I (1997-2007)":["1.2 75cv","1.4 75cv","1.6 95cv","1.5 dCi 65cv","1.5 dCi 80cv","1.9 D 64cv","1.9 DTi 80cv"],
"Kangoo II (2008-)":["1.2 TCe 115cv","1.5 dCi 75cv","1.5 dCi 90cv","1.5 dCi 110cv","1.6 105cv","1.6 dCi 130cv"],
"Laguna I (1993-2001)":["1.6 90cv","1.8 95cv","2.0 115cv","3.0 V6 170cv","1.9 dTi 80cv","2.2 dT 113cv"],
"Laguna II (2001-2007)":["1.6 107cv","1.8 120cv","2.0 136cv","3.0 V6 207cv","1.9 dCi 100cv","1.9 dCi 120cv","2.0 dCi 150cv"],
"Logan I (2004-2012)":["1.4 MPI 75cv","1.6 MPI 87cv","1.6 MPI 105cv","1.5 dCi 65cv","1.5 dCi 68cv","1.5 dCi 86cv","1.5 dCi 90cv"],
"Logan II (2012-)":["0.9 TCe 90cv","1.2 75cv","1.6 MPI 85cv","1.6 SCe 100cv","1.5 dCi 90cv","1.5 dCi 105cv"],
"Master II (1998-2010)":["2.2 dCi 90cv","2.5 dCi 120cv","2.5 dCi 146cv","3.0 dCi 146cv"],
"Master III (2010-)":["2.3 dCi 100cv","2.3 dCi 125cv","2.3 dCi 150cv","2.3 dCi 170cv"],
"Megane I (1995-2002)":["1.4 75cv","1.6 107cv","1.6 110cv","1.8 116cv","2.0 147cv","1.9 D 64cv","1.9 dTi 80cv","2.0 dTi 115cv"],
"Megane II (2002-2008)":["1.4 98cv","1.6 110cv","2.0 135cv","2.0 RS 225cv","1.5 dCi 80cv","1.5 dCi 100cv","1.5 dCi 105cv","1.9 dCi 120cv","2.0 dCi 150cv"],
"Megane III (2008-2016)":["1.2 TCe 115cv","1.4 TCe 130cv","1.6 110cv","1.6 TCe 180cv","2.0 RS 265cv","1.5 dCi 90cv","1.5 dCi 110cv","2.0 dCi 150cv"],
"Megane IV (2016-)":["1.2 TCe 100cv","1.2 TCe 130cv","1.3 TCe 140cv","1.5 Blue dCi 115cv","1.6 dCi 130cv"],
"Sandero I (2008-2012)":["1.2 75cv","1.4 MPI 75cv","1.6 MPI 87cv","1.5 dCi 65cv","1.5 dCi 68cv","1.5 dCi 86cv"],
"Sandero II (2012-)":["0.9 TCe 90cv","1.2 75cv","1.6 MPI 85cv","1.5 dCi 75cv","1.5 dCi 90cv"],
"Scenic I (1996-2003)":["1.4 95cv","1.6 107cv","1.8 116cv","2.0 147cv","1.9 TD 95cv","1.9 dCi 102cv"],
"Scenic II (2003-2009)":["1.4 98cv","1.6 110cv","2.0 135cv","1.5 dCi 100cv","1.5 dCi 105cv","1.9 dCi 120cv","2.0 dCi 150cv"],
"Symbol I (2000-2008)":["1.4 75cv","1.4 MPI 98cv","1.6 MPI 107cv","1.5 dCi 65cv","1.5 dCi 68cv","1.5 dCi 86cv","1.9 D 64cv"],
"Symbol II (2008-2012)":["1.2 75cv","1.4 MPI 75cv","1.5 dCi 68cv","1.5 dCi 86cv"],
"Trafic II (2001-2014)":["1.9 dCi 100cv","2.0 dCi 90cv","2.0 dCi 115cv","2.5 dCi 115cv","2.5 dCi 146cv"],
"Trafic III (2014-)":["1.6 dCi 95cv","1.6 dCi 125cv","2.0 dCi 120cv","2.0 dCi 145cv","2.0 dCi 185cv"],
"Twingo I (1993-2012)":["1.2 55cv","1.2 58cv","1.2 16v 75cv","1.5 dCi 65cv"],
"Twingo II (2007-2014)":["1.1 75cv","1.2 75cv","1.6 RS 133cv","1.5 dCi 65cv","1.5 dCi 84cv"],
"19 (1988-1996)":["1.2 60cv","1.4 80cv","1.8 110cv","1.9 D 65cv","1.9 TD 90cv"],
"21 (1986-1994)":["1.7 90cv","2.0 120cv","2.1 TD 88cv"]
},
"Seat":{
"Alhambra I (1996-2010)":["2.0 115cv","1.9 TDI 90cv","1.9 TDI 115cv","1.8 T 150cv","2.8 V6 174cv"],
"Arosa (1997-2004)":["1.0 50cv","1.4 60cv","1.7 SDI 60cv"],
"Cordoba (1993-2009)":["1.0 50cv","1.4 60cv","1.6 75cv","1.6 101cv","1.8 T 150cv","1.9 TDI 90cv","1.9 TDI 110cv"],
"Ibiza III (2002-2008)":["1.2 64cv","1.4 75cv","1.4 16v 100cv","1.6 100cv","1.8 T 150cv","1.4 TDI 80cv","1.9 TDI 100cv","1.9 TDI 130cv","2.0 TDI 140cv"],
"Ibiza IV (2008-2017)":["1.2 70cv","1.2 TSI 105cv","1.4 85cv","1.4 TSI 150cv","1.2 TDI 75cv","1.6 TDI 90cv","1.6 TDI 105cv","2.0 TDI 143cv"],
"Leon I (1999-2005)":["1.4 16v 100cv","1.6 100cv","1.8 20v 125cv","1.8 T 180cv","1.8 T Cupra 225cv","1.9 TDI 100cv","1.9 TDI 110cv","1.9 TDI 150cv"],
"Leon II (2005-2012)":["1.4 TSI 125cv","1.6 102cv","2.0 TFSI 200cv","2.0 TFSI Cupra 256cv","1.6 TDI 90cv","1.9 TDI 105cv","2.0 TDI 140cv","2.0 TDI 170cv"],
"Leon III (2012-)":["1.2 TSI 86cv","1.2 TSI 105cv","1.4 TSI 125cv","2.0 Cupra 290cv","1.6 TDI 90cv","1.6 TDI 105cv","2.0 TDI 150cv","2.0 TDI 184cv"],
"Toledo II (1998-2004)":["1.6 100cv","1.8 20v 125cv","1.8 T 180cv","1.9 TDI 90cv","1.9 TDI 110cv"]
},
"Skoda":{
"Fabia I (1999-2007)":["1.2 55cv","1.2 64cv","1.4 60cv","1.4 75cv","1.6 101cv","1.4 TDI 70cv","1.9 TDI 100cv","1.9 TDI 130cv"],
"Fabia II (2007-2014)":["1.2 65cv","1.2 TSI 105cv","1.4 86cv","1.6 105cv","1.4 TDI 80cv","1.6 TDI 90cv","2.0 TDI 140cv"],
"Octavia I (1996-2010)":["1.4 68cv","1.6 75cv","1.6 102cv","1.8 T 150cv","1.8 T RS 180cv","1.9 TDI 90cv","1.9 TDI 110cv","2.0 TDI 140cv"],
"Octavia II (2004-2013)":["1.4 TSI 122cv","1.6 102cv","1.8 T 160cv","2.0 TFSI 200cv","1.6 TDI 90cv","1.9 TDI 105cv","2.0 TDI 140cv","2.0 TDI 170cv"],
"Octavia III (2012-2020)":["1.2 TSI 86cv","1.2 TSI 105cv","1.4 TSI 140cv","2.0 RS 220cv","1.6 TDI 90cv","1.6 TDI 115cv","2.0 TDI 150cv","2.0 TDI 184cv"],
"Roomster (2006-2015)":["1.2 70cv","1.4 86cv","1.6 105cv","1.2 TDI 75cv","1.4 TDI 80cv","1.9 TDI 105cv"],
"Superb I (2001-2008)":["1.8 T 150cv","2.0 115cv","2.5 TDI 155cv","1.9 TDI 130cv"],
"Superb II (2008-2015)":["1.4 TSI 125cv","1.8 TSI 160cv","2.0 TFSI 200cv","1.6 TDI 105cv","2.0 TDI 140cv","2.0 TDI 170cv"],
"Yeti (2009-2017)":["1.2 TSI 105cv","1.4 TSI 122cv","2.0 TFSI 200cv","1.6 TDI 90cv","2.0 TDI 110cv","2.0 TDI 140cv","2.0 TDI 150cv"]
},
"Subaru":{
"Forester I (1997-2002)":["2.0 125cv","2.0 GT 170cv","2.0 TD 85cv"],
"Forester II (2002-2008)":["2.0 140cv","2.0 XT 220cv","2.5 XT 230cv","2.0 TD 108cv"],
"Impreza II (2000-2007)":["1.5 100cv","2.0 125cv","2.0 WRX 223cv","2.5 STI 265cv","2.0 TD 110cv"],
"Legacy IV (2003-2009)":["2.0 165cv","2.5 167cv","3.0 245cv","2.0 D 150cv"],
"XV (2012-)":["2.0 150cv","2.0 D 147cv"]
},
"Suzuki":{
"Alto V (2002-2006)":["1.1 65cv"],
"Baleno (1995-2002)":["1.3 80cv","1.6 100cv","1.9 D 67cv"],
"Grand Vitara I (1998-2005)":["1.6 97cv","2.0 128cv","2.5 V6 155cv","2.0 HDI 109cv"],
"Grand Vitara II (2005-2015)":["1.6 106cv","2.0 140cv","2.4 166cv","1.9 DDiS 129cv"],
"Ignis (2000-2008)":["1.3 83cv","1.5 99cv","1.3 DDiS 70cv"],
"Jimny (1998-)":["1.3 80cv","1.3 DDiS 70cv"],
"Liana (2001-2007)":["1.3 90cv","1.6 103cv","1.4 DDiS 90cv"],
"Swift III (2005-2010)":["1.3 88cv","1.5 102cv","1.3 DDiS 69cv","1.3 DDiS 92cv"],
"Swift IV (2010-2017)":["1.2 94cv","1.6 Sport 136cv","1.3 DDiS 75cv"],
"SX4 I (2006-2014)":["1.5 107cv","1.6 112cv","2.0 4WD 143cv","1.6 DDiS 90cv","2.0 DDiS 135cv"],
"Vitara II (2015-)":["1.6 120cv","1.4 BoosterJet 140cv","1.6 DDiS 120cv"]
},
"Toyota":{
"Avensis I T22 (1997-2003)":["1.6 110cv","1.8 129cv","2.0 131cv","2.0 D4-D 110cv","2.0 TD 90cv"],
"Avensis II T25 (2003-2009)":["1.6 110cv","1.8 129cv","2.0 147cv","2.4 162cv","2.0 D4-D 116cv","2.2 D4-D 150cv","2.2 D4-D 180cv"],
"Avensis III T27 (2009-2018)":["1.6 132cv","1.8 147cv","2.0 152cv","1.6 D4-D 115cv","2.0 D4-D 124cv","2.2 D4-D 150cv","2.2 D4-D 177cv"],
"Aygo I (2005-2014)":["1.0 68cv","1.4 D4-D 55cv"],
"Aygo II (2014-)":["1.0 72cv"],
"Corolla E12 (2001-2007)":["1.4 97cv","1.6 110cv","1.8 136cv","1.4 D4-D 90cv","2.0 D4-D 90cv","2.0 D4-D 110cv","2.2 D4-D 136cv"],
"Corolla E15 (2006-2013)":["1.4 97cv","1.6 124cv","1.8 136cv","1.4 D4-D 90cv","2.0 D4-D 126cv"],
"Hilux VII (2004-2015)":["2.5 D4-D 102cv","2.5 D4-D 120cv","2.5 D4-D 144cv","3.0 D4-D 163cv","3.0 D4-D 171cv"],
"Hilux VIII (2015-)":["2.4 D4-D 150cv","2.8 D4-D 204cv"],
"Land Cruiser 100 (1998-2007)":["4.2 TD 204cv","4.7 V8 238cv","4.0 V6 249cv"],
"Land Cruiser Prado 120 (2002-2009)":["2.7 163cv","3.4 V6 217cv","4.0 V6 249cv","3.0 D4-D 163cv","3.0 D4-D 190cv"],
"Prius II (2003-2009)":["1.5 Hybrid 77cv"],
"Prius III (2009-2015)":["1.8 Hybrid 99cv"],
"RAV4 II (2000-2006)":["1.8 125cv","2.0 150cv","2.0 D4-D 116cv"],
"RAV4 III (2006-2012)":["2.0 152cv","2.2 D4-D 136cv","2.2 D4-D 150cv","3.5 V6 272cv"],
"Verso (2009-2018)":["1.6 132cv","1.8 147cv","2.0 152cv","2.0 D4-D 124cv","2.2 D4-D 150cv","2.2 D4-D 177cv"],
"Yaris I (1999-2005)":["1.0 VVT-i 65cv","1.3 87cv","1.5 106cv","1.4 D4-D 75cv"],
"Yaris II (2006-2011)":["1.0 VVT-i 69cv","1.3 VVT-i 87cv","1.5 VVT-i 104cv","1.4 D4-D 90cv"],
"Yaris III (2011-2020)":["1.0 69cv","1.33 99cv","1.4 D4-D 90cv"]
},
"Volkswagen":{
"Golf III (1991-1997)":["1.4 60cv","1.6 101cv","1.8 90cv","2.0 115cv","2.8 VR6 174cv","1.9 D 64cv","1.9 TDI 90cv","1.9 SDI 64cv"],
"Golf IV (1997-2006)":["1.4 75cv","1.6 100cv","1.8 T 150cv","1.8 T GTI 180cv","2.3 V5 150cv","2.8 VR6 204cv","1.9 SDI 68cv","1.9 TDI 90cv","1.9 TDI 100cv","1.9 TDI 130cv","2.0 TDI 136cv"],
"Golf V (2003-2008)":["1.4 80cv","1.4 TSI 170cv","1.6 102cv","2.0 GTI 200cv","2.0 R32 250cv","1.9 TDI 90cv","1.9 TDI 105cv","2.0 TDI 136cv","2.0 TDI 140cv"],
"Golf VI (2008-2013)":["1.2 TSI 85cv","1.4 TSI 122cv","1.4 TSI 160cv","2.0 GTI 210cv","1.6 TDI 105cv","2.0 TDI 110cv","2.0 TDI 140cv"],
"Golf VII (2012-)":["1.2 TSI 105cv","1.4 TSI 125cv","1.4 TSI 140cv","2.0 GTI 220cv","2.0 R 300cv","1.6 TDI 90cv","1.6 TDI 105cv","2.0 TDI 150cv","2.0 TDI 184cv"],
"Jetta IV (1998-2005)":["1.6 102cv","1.8 T 150cv","2.3 V5 150cv","1.9 TDI 90cv","1.9 TDI 100cv","1.9 TDI 130cv"],
"Jetta V (2005-2010)":["1.6 102cv","1.4 TSI 140cv","2.0 TFSI 200cv","1.6 TDI 90cv","1.9 TDI 105cv","2.0 TDI 140cv"],
"Passat B5 (1996-2005)":["1.6 100cv","1.8 125cv","1.8 T 150cv","2.0 115cv","2.8 4Motion 193cv","1.9 TDI 90cv","1.9 TDI 100cv","1.9 TDI 130cv","2.0 TDI 136cv","2.5 TDI 150cv"],
"Passat B6 (2005-2010)":["1.6 FSI 115cv","2.0 FSI 150cv","2.0 TFSI 200cv","3.6 FSI 280cv","1.6 TDI 105cv","1.9 TDI 105cv","2.0 TDI 140cv","2.0 TDI 170cv"],
"Passat B7 (2010-2014)":["1.4 TSI 122cv","1.8 TSI 160cv","2.0 TSI 210cv","1.6 TDI 105cv","2.0 TDI 140cv","2.0 TDI 177cv"],
"Polo III (1994-2001)":["1.0 50cv","1.0 67cv","1.4 60cv","1.6 GTI 125cv","1.4 TDI 75cv","1.9 SDI 68cv"],
"Polo IV (2001-2009)":["1.2 64cv","1.4 75cv","1.4 100cv","1.6 105cv","1.8 T 150cv","1.4 TDI 70cv","1.4 TDI 80cv","1.9 TDI 100cv","1.9 TDI 130cv"],
"Polo V (2009-2017)":["1.2 60cv","1.2 TSI 90cv","1.4 TSI 132cv","1.6 GTI 180cv","1.2 TDI 75cv","1.6 TDI 75cv","1.6 TDI 90cv"],
"Tiguan I (2007-2016)":["1.4 TSI 122cv","2.0 TSI 170cv","2.0 TSI 200cv","2.0 TDI 110cv","2.0 TDI 140cv","2.0 TDI 170cv"],
"Touareg I (2002-2010)":["3.2 V6 220cv","4.2 V8 310cv","5.0 TDI V10 313cv","2.5 TDI 174cv","3.0 TDI 224cv"],
"Touran (2003-2015)":["1.4 TSI 140cv","1.6 102cv","2.0 200cv","1.6 TDI 105cv","1.9 TDI 100cv","1.9 TDI 105cv","2.0 TDI 136cv","2.0 TDI 140cv"],
"Caddy III (2004-2015)":["1.6 102cv","2.0 109cv","1.6 TDI 75cv","1.6 TDI 102cv","2.0 TDI 110cv","1.9 TDI 105cv"],
"T5 (2003-2015)":["2.0 115cv","3.2 V6 235cv","1.9 TDI 85cv","1.9 TDI 102cv","2.0 TDI 84cv","2.0 TDI 102cv","2.5 TDI 130cv","2.5 TDI 174cv"]
},
"Volvo":{
"C30 (2006-2013)":["1.6 100cv","2.0 145cv","2.4i 170cv","1.6 D 109cv","2.0 D 136cv"],
"S40 II (2004-2012)":["1.6 100cv","2.0 145cv","2.4i 170cv","2.5 T5 220cv","1.6 D 109cv","2.0 D 136cv"],
"S60 I (2000-2010)":["2.0 T 180cv","2.3 250cv","2.4 140cv","2.4 200cv","2.4 D 130cv","2.4 D5 163cv"],
"V50 (2004-2012)":["1.6 100cv","2.0 145cv","1.8 125cv","2.4 170cv","1.6 D 110cv","2.0 D 136cv","2.0 D 150cv"],
"V70 II (2000-2007)":["2.0 140cv","2.4 170cv","2.5 T 209cv","2.4 D 130cv","2.4 D5 163cv"],
"XC60 I (2008-2017)":["2.0 T 210cv","2.4 200cv","3.0 T6 305cv","2.4 D 175cv","2.4 D5 200cv","2.0 D 136cv"],
"XC90 I (2002-2014)":["2.9 T6 275cv","2.5 T 210cv","2.4 D5 163cv","2.4 D5 200cv"]
}
};

/* ========== VEHICLE MEMORY API ========== */
window.PDZ=window.PDZ||{};
window.PDZ.VDB=VDB;
window.PDZ.setVehicle=function(v){try{localStorage.setItem(STORE_KEY,JSON.stringify(v));}catch(e){}injectBanner(v);};
window.PDZ.getVehicle=function(){try{var s=localStorage.getItem(STORE_KEY);return s?JSON.parse(s):null;}catch(e){return null;}};
window.PDZ.clearVehicle=function(){try{localStorage.removeItem(STORE_KEY);}catch(e){}var b=document.getElementById('pdz-vbar');if(b)b.remove();};

/* ========== BANNER INJECTION ========== */
function injectBanner(v){
  var old=document.getElementById('pdz-vbar');if(old)old.remove();
  if(!v||!v.make)return;
  var lbl=v.label||(v.make+(v.model?' '+v.model:'')+(v.engine?' — '+v.engine:''));
  var bar=document.createElement('div');bar.id='pdz-vbar';
  bar.innerHTML='<svg width="22" height="16" viewBox="0 0 40 26" fill="none" style="flex-shrink:0"><path d="M3 18L6 12Q9 7 15 6L25 6Q31 7 34 12L37 18L37 22L3 22Z" stroke="#ff6600" stroke-width="2.2" fill="none"/><circle cx="10" cy="22" r="4" stroke="#ff6600" stroke-width="2" fill="none"/><circle cx="30" cy="22" r="4" stroke="#ff6600" stroke-width="2" fill="none"/><path d="M8 12L15 8L25 8L32 12" stroke="#ff6600" stroke-width="1.5"/></svg><strong>'+lbl+'</strong><a class="pvb-search" href="/pages/catalogue">Chercher des pieces</a><span class="pvb-change" onclick="window.PDZ.clearVehicle()">Changer de vehicule</span>';
  var hdr=document.querySelector('header.site-header')||document.querySelector('header')||document.body.firstChild;
  if(hdr&&hdr.parentNode)hdr.parentNode.insertBefore(bar,hdr.nextSibling);else document.body.insertBefore(bar,document.body.firstChild);
}

/* ========== COMPAT CHECK ========== */
function checkCompat(v){
  if(!v||!v.make)return;
  var mk=v.make.toLowerCase().replace(/\s+/g,'-');
  var md=(v.model||'').toLowerCase().replace(/[^a-z0-9]/g,'-');
  document.querySelectorAll('[data-product-tags]').forEach(function(el){
    var tags=el.dataset.productTags||'';
    var ok=tags.indexOf('compat-'+mk+'-'+md)>-1||tags.indexOf('compat-universel')>-1;
    var badge=el.querySelector('.pdz-compat');
    if(!badge){badge=document.createElement('span');badge.className='pdz-compat';badge.style.cssText='display:inline-block;padding:2px 7px;border-radius:2px;font-size:.7rem;font-weight:700;margin-top:4px;';el.appendChild(badge);}
    badge.style.background=ok?'#e6f4ea':'#fff3e0';
    badge.style.color=ok?'#1b6e2e':'#9a5500';
    badge.textContent=ok?'Compatible avec votre vehicule':'Verifier compatibilite';
  });
}

/* ========== OVERRIDE HOME SELECTS ========== */
function overrideHomeSelects(){
  var sels=document.querySelectorAll('select[name="make"],select.brand-select,select[data-vehicle-make],.vehicle-make-select');
  sels.forEach(function(sel){
    if(sel.dataset.pdzDone)return;sel.dataset.pdzDone='1';
    sel.innerHTML='<option value="">-- Marque --</option>';
    Object.keys(VDB).sort().forEach(function(m){sel.innerHTML+='<option value="'+m+'">'+m+'</option>';});
  });
}

/* ========== INIT ========== */
document.addEventListener('DOMContentLoaded',function(){
  var sv=window.PDZ.getVehicle();
  if(sv)injectBanner(sv);
  overrideHomeSelects();
  checkCompat(sv);
});
})();
