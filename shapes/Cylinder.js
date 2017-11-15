/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Cylinder(n) {

    this.name = "cylinder";

    this.numVertices = (n * 12);
    this.numTriangles = (n * 4);

    this.vertices = [];
    this.colors = [];
    this.normals = [];
    this.texCoords = [];

    var theta = 2 * (Math.PI / n);

    // Local variables: unique vertices and colors.
    ////////////////////////////////////////////////////////////

    for (var i = 0; i < n; i++) {
        this.vertices.push(vec4(Math.cos(i * theta), 0, Math.sin(i * theta), 1.0));
        this.vertices.push(vec4(0.0, 0.0, 0.0, 1.0));
        this.vertices.push(vec4(Math.cos((i + 1) * theta), 0, Math.sin((i + 1) * theta), 1.0));

        this.normals.push(vec4(0, -1, 0, 0));
        this.normals.push(vec4(0, -1, 0, 0));
        this.normals.push(vec4(0, -1, 0, 0));

        this.texCoords.push(vec2((.5 * (Math.cos(i * theta))) + .5, (.5 * (Math.sin(i * theta))) + .5));
        this.texCoords.push(vec2(.5, .5));
        this.texCoords.push(vec2((.5 * (Math.cos((i + 1) * theta))) + .5, (.5 * (Math.sin((i + 1) * theta))) + .5));
    }



    for (var i = 0; i < n; i++) {
        this.vertices.push(vec4(Math.cos(i * (2 * (Math.PI / n))), 1, Math.sin(i * (2 * (Math.PI / n))), 1.0));
        this.vertices.push(vec4(0.0, 1.0, 0.0, 1.0));
        this.vertices.push(vec4(Math.cos((i + 1) * (2 * (Math.PI / n))), 1, Math.sin((i + 1) * (2 * (Math.PI / n))), 1.0));

        this.normals.push(vec4(0, 1, 0, 0));
        this.normals.push(vec4(0, 1, 0, 0));
        this.normals.push(vec4(0, 1, 0, 0));

        this.texCoords.push(vec2((.5 * (Math.cos(i * (2 * (Math.PI / n))))) + .5, (.5 * (Math.sin(i * (2 * (Math.PI / n))))) + .5));
        this.texCoords.push(vec2(.5, .5));
        this.texCoords.push(vec2((.5 * (Math.cos((i + 1) * (2 * (Math.PI / n))))) + .5, (.5 * (Math.sin((i + 1) * (2 * (Math.PI / n))))) + .5));
    }



    for (var i = 0; i < (n * 12); i++) {
        this.colors.push(vec4(Math.cos(i * (2 * (Math.PI / n))), Math.sin(i * (2 * (Math.PI / n))), 0.0, 1.0));
        this.colors.push(vec4(1.0, 1.0, 1.0, 1.0));
        this.colors.push(vec4(Math.cos(i * (2 * (Math.PI / n))), Math.sin(i * (2 * (Math.PI / n))), 0.0, 1.0));
    }



    for (var i = 0; i < n; i++) {
        this.vertices.push(vec4(Math.cos(i * (2 * (Math.PI / n))), 0, Math.sin(i * (2 * (Math.PI / n))), 1.0));
        this.vertices.push(vec4(Math.cos(i * (2 * (Math.PI / n))), 1, Math.sin(i * (2 * (Math.PI / n))), 1.0));
        this.vertices.push(vec4(Math.cos((i + 1) * (2 * (Math.PI / n))), 0, Math.sin((i + 1) * (2 * (Math.PI / n))), 1.0));

        this.vertices.push(vec4(Math.cos((i + 1) * (2 * (Math.PI / n))), 0, Math.sin((i + 1) * (2 * (Math.PI / n))), 1.0));
        this.vertices.push(vec4(Math.cos(i * (2 * (Math.PI / n))), 1, Math.sin(i * (2 * (Math.PI / n))), 1.0));
        this.vertices.push(vec4(Math.cos((i + 1) * (2 * (Math.PI / n))), 1, Math.sin((i + 1) * (2 * (Math.PI / n))), 1.0));

/*
        this.texCoords.push(vec2((.5 * Math.cos(i * theta)) + .5, 0));
        this.texCoords.push(vec2((.5 * Math.cos(i * theta)) + .5, 1));
        this.texCoords.push(vec2((.5 * Math.cos((i + 1) * theta)) + .5, 0));

        this.texCoords.push(vec2((.5 * Math.cos((i + 1) * theta)) + .5, 0));
        this.texCoords.push(vec2((.5 * Math.cos(i * theta)) + .5, 1));
        this.texCoords.push(vec2((.5 * Math.cos((i + 1) * theta)) + .5, 1));
*/
        this.texCoords.push(vec2(i/n, 1));
        this.texCoords.push(vec2(i/n, 0));
        this.texCoords.push(vec2((i+1)/n, 1));
        
        this.texCoords.push(vec2((i+1)/n, 1));
        this.texCoords.push(vec2(i/n, 0));
        this.texCoords.push(vec2((i+1)/n, 0));

        this.normals.push(vec4(Math.cos(i * (2 * (Math.PI / n))), 0, Math.sin(i * (2 * (Math.PI / n))), 0.0));
        this.normals.push(vec4(Math.cos(i * (2 * (Math.PI / n))), 0, Math.sin(i * (2 * (Math.PI / n))), 0.0));
        this.normals.push(vec4(Math.cos((i + 1) * (2 * (Math.PI / n))), 0, Math.sin((i + 1) * (2 * (Math.PI / n))), 0.0));

        this.normals.push(vec4(Math.cos((i + 1) * (2 * (Math.PI / n))), 0, Math.sin((i + 1) * (2 * (Math.PI / n))), 0.0));
        this.normals.push(vec4(Math.cos(i * (2 * (Math.PI / n))), 0, Math.sin(i * (2 * (Math.PI / n))), 0.0));
        this.normals.push(vec4(Math.cos((i + 1) * (2 * (Math.PI / n))), 0, Math.sin((i + 1) * (2 * (Math.PI / n))), 0.0));
    }


    /*
     uniqueVertices.push(vec4(Math.cos((n-1) * (2 * (Math.PI / n))), Math.sin((n-1) * (2 * (Math.PI / n))), 0.0, 1.0));
     uniqueVertices.push(vec4(Math.cos((n-1) * (2 * (Math.PI / n))), Math.sin((n-1) * (2 * (Math.PI / n))), 1.0, 1.0));
     uniqueVertices.push(vec4(Math.cos(0 * (2 * (Math.PI / n))), Math.sin(0 * (2 * (Math.PI / n))), 0.0, 1.0));
     uniqueVertices.push(vec4(Math.cos(0 * (2 * (Math.PI / n))), Math.sin(0 * (2 * (Math.PI / n))), 0.0, 1.0));
     uniqueVertices.push(vec4(Math.cos((n-1) * (2 * (Math.PI / n))), Math.sin((n-1) * (2 * (Math.PI / n))), 1.0, 1.0));
     uniqueVertices.push(vec4(Math.cos(0 * (2 * (Math.PI / n))), Math.sin(0 * (2 * (Math.PI / n))), 1.0, 1.0));
     
     }
     */



}


