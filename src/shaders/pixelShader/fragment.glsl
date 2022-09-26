uniform sampler2D tDiffuse;
uniform float pixelSize;
uniform vec2 resolution;
uniform float uTime;
uniform float uMaxRgbShift;

varying highp vec2 vUv;

float hash(vec2 p) { 
    return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); 
}

void main(){

    // make black and white
    vec4 textureBW = texture2D(tDiffuse, vUv);
    vec3 color = vec3((textureBW.r + textureBW.g + textureBW.b) / 5.0);
    
    // rgb shift
    vec2 shift = vec2(0.01, 0.01) * uMaxRgbShift;
    vec4 shiftTexture1 = texture2D(tDiffuse, vUv + shift);
    vec4 shiftTexture2 = texture2D(tDiffuse, vUv - shift);
    vec3 shiftColor1 = vec3((shiftTexture1.r + shiftTexture1.g + shiftTexture1.b) / 5.0);
    vec3 shiftColor2 = vec3((shiftTexture2.r + shiftTexture2.g + shiftTexture2.b) / 5.0);

    vec3 finalColor = vec3(shiftColor1.r, color.g, shiftColor2.b);


    // noise
    float val = hash(vUv + uTime * 0.01) * 0.2;


    vec2 dxy = pixelSize / resolution;
    vec2 coord = dxy * floor( vUv / dxy );

    // gl_FragColor = texture2D(tDiffuse, vUv);
    gl_FragColor = vec4(finalColor + vec3(val), 1.0);
}