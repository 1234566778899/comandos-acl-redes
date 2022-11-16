function convert_decimal(num) {
    let sum = 0;
    for (let i = num.length - 1; i >= 0; i--) {
        let val = parseInt(num[num.length - i - 1]);
        if (val == 1) {
            sum += Math.pow(2, i);
        }
    }
    return sum;
}
function getCadena(arr, inicio, fin) {
    let cad = '';
    for (let i = inicio; i < fin; i++) {
        cad += arr[i];
    }
    return cad;
}
function obtener_mascara(val) {
    let arr = [];
    for (let i = 0; i < 32; i++) {
        if (val > i) {
            arr.push('1');
        } else {
            arr.push('0');
        }
    }
    let p1 = getCadena(arr, 0, 8);
    let p2 = getCadena(arr, 8, 16);
    let p3 = getCadena(arr, 16, 24);
    let p4 = getCadena(arr, 24, 32);
    let combi = p1 + '.' + p2 + '.' + p3 + '.' + p4;
    $('.result-mascara').html(``);
    $('.result-mascara').append(`<span>${val} bits = ${combi}</span>`);
    p1 = convert_decimal(getCadena(arr, 0, 8));
    p2 = convert_decimal(getCadena(arr, 8, 16));
    p3 = convert_decimal(getCadena(arr, 16, 24));
    p4 = convert_decimal(getCadena(arr, 24, 32));
    combi = p1 + '.' + p2 + '.' + p3 + '.' + p4;
    $('.result-mascara').append(`<span> = ${combi}</span>`);
    wcard = (255 - p1) + '.' + (255 - p2) + '.' + (255 - p3) + '.' + (255 - p4);
    return wcard;
}
function resultado() {
    let p1 = parseInt(document.querySelector('#ip1').value);
    let p2 = parseInt(document.querySelector('#ip2').value);
    let p3 = parseInt(document.querySelector('#ip3').value);
    let p4 = parseInt(document.querySelector('#ip4').value);
    let cantidad = document.querySelector('#cantidad').value;
    let inicio = document.querySelector('#inicio').value;
    let condicion = document.querySelector('#condicion').value;
    // let p1 = 192;
    // let p2 = 168;
    // let p3 = 5;
    // let p4 = 0;
    let mascara = 24;
    let ip_inicial = p1 + '.' + p2 + '.' + p3 + '.' + p4;
    $('.resultado').html('');
    $('.resultado').append(`<br><span>ACL entendida enumerada</span><hr>`);
    if (inicio == 'primero') {
        let sum = 0;
        for (let i = 8; i >= 0; i--) {
            let num = Math.pow(2, i);
            if (sum + num <= cantidad) {
                sum += num;
                let ip = p1 + '.' + p2 + '.' + p3 + '.' + p4;
                $('.resultado').append(`<span class="text-success"> > access-list 100 ${condicion} ip</span>`);
                $('.resultado').append(`<span>  ${ip} </span><span class="text-danger">${obtener_mascara(32 - i)} any</span> <br>`);
                //$('.resultado').append(`<span>  -> /${32 - i} ${num} ips </span><br>`);

                if (p4 + num > 255) {
                    p3 += num;
                } else {
                    p4 += num;
                }
            }
        }
    } else {
        let sum = 0;
        p4 = 256;
        for (let i = 7; i >= 0; i--) {
            let num = Math.pow(2, i);
            if (sum + num <= cantidad) {
                sum += num;
                if (p4 - num < 0) {
                    p3 + - num;
                } else {
                    p4 -= num;
                }
                let ip = p1 + '.' + p2 + '.' + p3 + '.' + p4;
                $('.resultado').append(`<span class="text-success"> > access-list 100 ${condicion} ip</span>`);
                $('.resultado').append(`<span>  ${ip} </span><span class="text-danger">${obtener_mascara(32 - i)} any</span><br>`);
                // $('.resultado').append(`<span>  -> /${32 - i} ${num} ips </span><br>`);
            }
        }
    }

    if (condicion == 'deny') {
        $('.resultado').append(`<span class="text-success">> access-list 100 permit ip ${ip_inicial} ${obtener_mascara(mascara)} any</span><br>`);
    } else {
        $('.resultado').append(`<span class="text-success">> access-list 100 deny ip ${ip_inicial} ${obtener_mascara(mascara)} any</span><br>`);
    }
    $('.resultado').append(`<span class="text-success">> access-list 100 permit ip any any</span><br>`);
    $('.resultado').append(`<span class="text-success">> int g0/-</span><br>`);
    $('.resultado').append(`<span class="text-success">> ip access-group 100 in</span><br>`);
}


function resultado2() {

    let ip1_origen = parseInt(document.querySelector('#_ip1_origen').value);
    let ip2_origen = parseInt(document.querySelector('#_ip2_origen').value);
    let ip3_origen = parseInt(document.querySelector('#_ip3_origen').value);
    let ip4_origen = parseInt(document.querySelector('#_ip4_origen').value);
    let ip1_destino = parseInt(document.querySelector('#_ip1_destino').value);
    let ip2_destino = parseInt(document.querySelector('#_ip2_destino').value);
    let ip3_destino = parseInt(document.querySelector('#_ip3_destino').value);
    let ip4_destino = parseInt(document.querySelector('#_ip4_destino').value);
    let cantidad = document.querySelector('#_cantidad').value;
    let inicio = document.querySelector('#_inicio').value;
    let condicion = document.querySelector('#_condicion').value;
    let aplicacion = document.querySelector('#_aplicacion').value;
    /* <option value="ip">IP</option>
       <option value="ftp">FTP</option>
       <option value="ssh">SSH</option>
       <option value="telnet">Telnet</option>
       <option value="smtp">SMTP</option>
       <option value="dns">DNS</option>
       <option value="dhcp">DHCP</option>
       <option value="tftp">TFTP</option>
       <option value="http">HTTP</option>
       <option value="pop3">POP3</option>
       <option value="imap">IMAP</option>
       <option value="snmp">SNMP</option>
       <option value="https">HTTPS</option> */
    let aux = [
        {
            aplicacion: 'ip',
            protocolo: ['ip'],
            puerto: []
        },
        {
            aplicacion: 'ftp',
            protocolo: ['tcp'],
            puerto: ['20', '21']
        },
        {
            aplicacion: 'ssh',
            protocolo: ['tcp'],
            puerto: ['22']
        },
        {
            aplicacion: 'telnet',
            protocolo: ['tcp'],
            puerto: ['23']
        },
        {
            aplicacion: 'smtp',
            protocolo: ['tcp'],
            puerto: ['25']
        },
        {
            aplicacion: 'dns',
            protocolo: ['udp', 'tcp'],
            puerto: ['53']
        },
        {
            aplicacion: 'dhcp',
            protocolo: ['udp'],
            puerto: ['67']
        },
        {
            aplicacion: 'tftp',
            protocolo: ['udp'],
            puerto: ['69']
        },
        {
            aplicacion: 'http',
            protocolo: ['tcp'],
            puerto: ['80']
        },
        {
            aplicacion: 'pop3',
            protocolo: ['tcp'],
            puerto: ['110']
        },
        {
            aplicacion: 'imap',
            protocolo: ['tcp'],
            puerto: ['143']
        },
        {
            aplicacion: 'snmp',
            protocolo: ['udp'],
            puerto: ['61']
        },
        {
            aplicacion: 'https',
            protocolo: ['tcp'],
            puerto: ['443']
        },
    ]
    let ip_destino = ip1_destino + '.' + ip2_destino + '.' + ip3_destino + '.' + ip4_destino;
    let ip_inicial = ip1_origen + '.' + ip2_origen + '.' + ip3_origen + '.' + ip4_origen;
    let mascara = 24;
    let app = aux.find(x => x.aplicacion == aplicacion);
    //$('._resultado').append(`<br><span>${app.aplicacion} - ${app.protocolo} - ${app.puerto}</span>`);
    //
    $('._resultado').html('');
    $('._resultado').append(`<br><span>ACL entendida etiquetada</span><hr>`);
    $('._resultado').append(`<span>> ip access-list extended filtro-name</span><br>`);
    if (inicio == 'primero') {
        let sum = 0;
        for (let i = 8; i >= 0; i--) {
            let num = Math.pow(2, i);
            if (sum + num <= cantidad) {
                sum += num;
                let ip_origen = ip1_origen + '.' + ip2_origen + '.' + ip3_origen + '.' + ip4_origen;
                
                $('._resultado').append(`<span class="text-success"> > ${condicion} ${app.protocolo} </span>`);
                $('._resultado').append(`<span>  ${ip_origen} </span><span class="text-danger">${obtener_mascara(32 - i)} </span>`);
                $('._resultado').append(`<span class="text-warnning">host ${ip_destino} ${getPuerto(app)}</span><br>`);

                if (ip4_origen + num > 255) {
                    ip3_origen += num;
                } else {
                    ip4_origen += num;
                }
            }
        }
    } else {
        let sum = 0;
        ip4_origen = 256;
        for (let i = 7; i >= 0; i--) {
            let num = Math.pow(2, i);
            if (sum + num <= cantidad) {
                sum += num;
                if (ip4_origen - num < 0) {
                    ip3_origen + - num;
                } else {
                    ip4_origen -= num;
                }
                let ip_origen = ip1_origen + '.' + ip2_origen + '.' + ip3_origen + '.' + ip4_origen;
                
                $('._resultado').append(`<span class="text-success"> > ${condicion} ${app.protocolo} </span>`);
                $('._resultado').append(`<span>  ${ip_origen} </span><span class="text-danger">${obtener_mascara(32 - i)}</span>`);
                $('._resultado').append(`<span class="text-warning">host ${ip_destino} ${getPuerto(app)}</span><br>`);
            }
        }
    }
    if (condicion == 'deny') {
        $('._resultado').append(`<span class="text-success">> permit ${app.protocolo} ${ip_inicial} ${obtener_mascara(mascara)} 
        host ${ip_destino}</span><br>`);
    } else {
        $('._resultado').append(`<span class="text-success">> deny ${app.protocolo} ${ip_inicial} ${obtener_mascara(mascara)} 
        host ${ip_destino}</span><br>`);
    }


    $('._resultado').append(`<span class="text-success">> permit ip any any</span><br>`);
    $('._resultado').append(`<span class="text-success">> int g0/-</span><br>`);
    $('._resultado').append(`<span class="text-success">> ip access-group filtro-name in</span><br>`);
}
function getPuerto(app) {
    if (app.aplicacion == 'ip') return '';
    return 'eq ' + app.puerto;
}
resultado2();