const http = require('http');
const url = require('url');

const Students = [
    { id: 1, name: 'Student 1', email: 'email1@student.com' },
    { id: 2, name: 'Student 2', email: 'email2@student.com' },
    { id: 3, name: 'Student 3', email: 'email3@student.com' },
]

const server = http.createServer((req, res) => {
    let { pathname } = url.parse(req.url, true);
    if (pathname.slice(-1) === '/') {
        pathname = pathname.slice(0, -1)
    }
    let params = pathname.slice(1).split('/')

    const [collections, id] = params;
    let chunks = "";

    res.writeHead(200, { 'Content-Type': 'application/json' });

    req.on("data", (chunk) => {
        chunks += chunk;
    });

    req.on("end", () => {
        if (collections == 'students') {
            switch (params.length) {
                case 1:
                    // TH1: /students
                    switch (req.method) {
                        case 'GET': return res.end(JSON.stringify({ status: 'success', data: Students }));
                        case 'POST':
                            const newId = Students[Students.length - 1].id + 1
                            const student = Object.assign(
                                { id: newId },
                                JSON.parse(chunks),
                            )
                            Students.push(student)
                            return res.end(JSON.stringify({ status: 'success', data: student }))
                        default:
                            return res.end(JSON.stringify({ status: 'fail', message: `${req.method} is not supported` }))
                    }
                case 2:
                    // TH2: /students/id
                    if (isNaN(id)) return res.end(JSON.stringify({ status: 'fail', message: `Invalid ID` }))
                    const index = Students.findIndex(s => s.id == id)
                    if (index == -1) return res.end(JSON.stringify({ status: 'fail', message: 'Index out of bound' }))
                    switch (req.method) {
                        case 'GET': return res.end(JSON.stringify({ status: 'success', data: Students[index] }))
                        case 'PUT':
                            const student = Object.assign(
                                { id: Students[index].id },
                                JSON.parse(chunks),
                            )
                            Students[index] = student;
                            return res.end(JSON.stringify({ status: 'success', data: student }))
                        case 'DELETE':
                            if (index > -1) {
                                Students.splice(index, 1)
                                return res.end(JSON.stringify({ status: 'success', message: 'Delete success' }))
                            }
                            return res.end(JSON.stringify({ status: 'fail', message: 'Student list is empty' }))
                        default:
                            return res.end(JSON.stringify({ status: 'fail', message: `${req.method} is not supported` }))
                    }
                default:
                    return res.end(JSON.stringify({ status: 'fail', message: 'Path name is not exist' }))
            }
        } else {
            return res.end(JSON.stringify({ status: 'fail', message: 'Path name is not exist' }))
        }
    })
});

server.listen(4000, () => console.log('Server is running on port 4000'));