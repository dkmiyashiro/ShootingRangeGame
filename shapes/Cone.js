
function Cone() {

    var n = 30;

    this.name = "cone";

    this.numVertices = (n * 6);
    this.numTriangles = (n * 2);

    this.vertices = [];
    this.colors = [];
    this.normals = [];
    this.texCoords = [];

    // Local variables: unique vertices and colors.
    ////////////////////////////////////////////////////////////


    for (var i = 0; i < n; i++) {
        this.vertices.push(vec4(Math.cos(i * (2 * (Math.PI / n))), 0, Math.sin(i * (2 * (Math.PI / n))), 1.0));
        this.vertices.push(vec4(0.0, 0.0, 0.0, 1.0));
        this.vertices.push(vec4(Math.cos((i + 1) * (2 * (Math.PI / n))), 0, Math.sin((i + 1) * (2 * (Math.PI / n))), 1.0));

        this.texCoords.push(vec2((.5 * (Math.cos(i * (2 * (Math.PI / n))))) + .5, (.5 * (Math.sin(i * (2 * (Math.PI / n))))) + .5));
        this.texCoords.push(vec2(.5, .5));
        this.texCoords.push(vec2((.5 * (Math.cos((i + 1) * (2 * (Math.PI / n))))) + .5, (.5 * (Math.sin((i + 1) * (2 * (Math.PI / n))))) + .5));

        this.normals.push(vec4(0.0, -1.0, 0.0, 0));
        this.normals.push(vec4(0.0, -1.0, 0.0, 0));
        this.normals.push(vec4(0.0, -1.0, 0.0, 0));
    }


    for (var i = 0; i < n; i++) {
        this.vertices.push(vec4(Math.cos(i * (2 * (Math.PI / n))), 0, Math.sin(i * (2 * (Math.PI / n))), 1.0));
        this.vertices.push(vec4(0.0, 1.0, 0.0, 1.0));
        this.vertices.push(vec4(Math.cos((i + 1) * (2 * (Math.PI / n))), 0, Math.sin((i + 1) * (2 * (Math.PI / n))), 1.0));

        this.texCoords.push(vec2((.5 * (Math.cos(i * (2 * (Math.PI / n))))) + .5, (.5 * (Math.sin(i * (2 * (Math.PI / n))))) + .5));
        this.texCoords.push(vec2(.5, .5));
        this.texCoords.push(vec2((.5 * (Math.cos((i + 1) * (2 * (Math.PI / n))))) + .5, (.5 * (Math.sin((i + 1) * (2 * (Math.PI / n))))) + .5));

        this.normals.push(vec4(Math.cos(i * (2 * (Math.PI / n))), 1, Math.sin(i * (2 * (Math.PI / n))), 0));
        this.normals.push(vec4(0.0, 1.0, 0.0, 0));
        this.normals.push(vec4(Math.cos((i + 1) * (2 * (Math.PI / n))), 1, Math.sin((i + 1) * (2 * (Math.PI / n))), 0));
    }


    for (var i = 0; i < (n * 6); i++) {
        this.colors.push(vec4(Math.cos(i * (2 * (Math.PI / n))), Math.sin(i * (2 * (Math.PI / n))), 0.0, 1));
        this.colors.push(vec4(1.0, 1.0, 1.0, 1.0));
        this.colors.push(vec4(Math.cos(i * (2 * (Math.PI / n))), Math.sin(i * (2 * (Math.PI / n))), 0.0, 1));
    }

}

