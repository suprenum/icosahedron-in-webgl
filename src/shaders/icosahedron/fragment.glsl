uniform sampler2D uLandscape;

varying vec3 vNormal;
varying vec3 vEyeVector;

vec2 hash22(vec2 p)
{
    p = fract(p * vec2(5.3983, 5.4427));
    p += dot(p.yx, p.xy + vec2(21.5351, 14.3137));
    return fract(vec2(p.x * p.y * 95.4337, p.x * p.y * 97.597));
}

void main()
{
    vec3 X = dFdx(vNormal);
    vec3 Y = dFdy(vNormal);
    vec3 normal = normalize(cross(X, Y));
    float diffuse = dot(normal, vec3(1.0));
    vec2 rand = hash22(vec2(floor(diffuse * 10.0)));
    
    vec2 uvMultipier = vec2(
        sign(rand.x - 0.5) * 1.0 + (rand.x - 0.5) * 0.6, 
        sign(rand.y - 0.5) * 1.0 + (rand.y - 0.5) * 0.6
    );

    vec2 newUv = uvMultipier * gl_FragCoord.xy / vec2(1000.0);

    float fresnel = pow(1.0 + dot(vEyeVector, normal), 2.0);


    vec3 refracted = refract(vEyeVector, normal, 1.0 / 3.0);
    newUv += refracted.xy * 0.2;


    vec4 texture = texture2D(uLandscape, newUv);

    gl_FragColor = texture * (1.0 - fresnel);
    // gl_FragColor = vec4(vec3(fresnel), 1.0);
}