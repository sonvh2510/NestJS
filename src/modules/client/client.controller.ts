import { Controller, Get, Render } from '@nestjs/common';
import axios from 'axios';
var parser = require('xml2json');

@Controller()
export class ClientController {
    @Get()
    // @Render('client/index')
    index() {
        const url = 'https://www.sjc.com.vn/xml/tygiavang.xml';
        return axios.get(url).then((res) => {
            // xml to json
            var json = parser.toJson(res.data);
            return json;
        });
    }
}
