varying vec3 vBarycentric;

void main()
{
    float width = 2.0;

    vec3 d = fwidth(vBarycentric);
    vec3 s = smoothstep(d * (width + 0.5), d * (width - 0.5), vBarycentric);

    float lines = max(s.x, max(s.y, s.z));

    if(lines < 0.1) discard;

    gl_FragColor = vec4(vec3(lines), 1.0);
}