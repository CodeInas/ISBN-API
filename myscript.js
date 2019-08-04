$(document).ready(function(){

    $("#form").submit(function(){

        var search =$("#ISBN").val();

        if(search==''){
            alert("Por favor, insira um número de ISBN.");
        } else{
            var url='';
            var img='';
            var title='';
            var author='';

            $.get("https://www.googleapis.com/books/v1/volumes?q=" + search,function(response){
                for(i=0;i<response.items.length;i++)
                {
                    title = $('<tr> <th> Título:  </th> <td> ' + response.items[i].volumeInfo.title + response.items[i].volumeInfo.subtitle +'</td> </tr>');
                    author=$('<tr> <th> Autor (es): </th> <td> '+response.items[i].volumeInfo.authors + '</td> </tr>');
                    identifier = $('<tr> <th> ISBN: </th> <td>' + response.items[i].volumeInfo.industryIdentifiers[i].identifier + '</td> </tr>');
                    publishedDate = $('<tr> <th>  Ano: </th> <td>' + response.items[i].volumeInfo.publishedDate + ' </td> </tr>');
                    URL = $('<tr> <th>  URL:  </th> <td> <a href=' + response.items[i].volumeInfo.infoLink + '> url  </td> </tr>');
                    country = $('<tr> <th> País </th> <td>' + response.items[i].accessInfo.country + '</td> </tr>');
                    pageCount = $('<tr> <th> Número de páginas <td>' + response.items[i].volumeInfo.pageCount + ' </td> </tr>');
                    printType = $('<tr> <th> Meio de divulgação: </th> <td>' + response.items[i].volumeInfo.printType + ' </td> </tr>')
                    publisher = $('<tr> <th> Editora: </th> <td>' + response.items[i].volumeInfo.publisher + ' </td> </tr>');
                    language = $('<tr> <th> Idioma: </th> <td>' + response.items[i].volumeInfo.language + ' </td> </tr>');
                    description = $('<tr> <th> Observações:  </th> <td>' + response.items[i].volumeInfo.description + ' </td> </tr>');
                    img=$('<button id="buttonExport" onclick="salvaPlanilha();">  Exportar em excel </button>');
                    

                    img.attr('src',url);
                    title.appendTo('#result');
                    author.appendTo('#result');
                    identifier.appendTo('#result');
                    publishedDate.appendTo('#result');
                    URL.appendTo('#result');
                    country.appendTo('#result');
                    pageCount.appendTo('#result');
                    printType.appendTo('#result');
                    language.appendTo('#result');
                    description.appendTo('#result');
                    publisher.appendTo('#result');
                    img.appendTo('#result');
                }
            });
        }
        return false;
    });    
});

function salvaPlanilha() {
    var htmlPlanilha = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>relatorio</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>' + document.getElementById("result").innerHTML + '</table></body></html>';
 
    var htmlBase64 = btoa(htmlPlanilha);
    var link = "data:application/vnd.ms-excel;base64," + htmlBase64;
    var hyperlink = document.createElement("a");
    hyperlink.download = "relatorioISBN";
    hyperlink.href = link;
    hyperlink.style.display = 'none';
 
    document.body.appendChild(hyperlink);
    hyperlink.click();
    document.body.removeChild(hyperlink);
}
