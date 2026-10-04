# Recorta design/logo.png (fondo gris) a un PNG transparente para la web.
import sys, collections
from PIL import Image, ImageDraw, ImageFilter
full=Image.open(sys.argv[1]).convert('RGB'); FW,FH=full.size; fp=full.load()
seen=bytearray(FW*FH); q=collections.deque()
for x in range(FW): q.append((x,0)); q.append((x,FH-1))
for y in range(FH): q.append((0,y)); q.append((FW-1,y))
def ok(c): return max(c)-min(c)<28 and max(c)>70
while q:
    x,y=q.popleft(); i=y*FW+x
    if seen[i] or not ok(fp[x,y]): continue
    seen[i]=1; c1=fp[x,y]
    for nx,ny in ((x+1,y),(x-1,y),(x,y+1),(x,y-1)):
        if 0<=nx<FW and 0<=ny<FH and not seen[ny*FW+nx]:
            c2=fp[nx,ny]
            if abs(c1[0]-c2[0])+abs(c1[1]-c2[1])+abs(c1[2]-c2[2])<30: q.append((nx,ny))
X0,Y0=190,190
src=full.crop((X0,Y0,1350,880)); W,H=src.size; sp=src.load()
al=Image.new('L',(W,H)); ap=al.load()
for y in range(H):
    for x in range(W):
        if seen[(y+Y0)*FW+x+X0]: continue
        r,g,b=sp[x,y]; l=(r+g+b)/3; s=max(r,g,b)-min(r,g,b)
        a=max(min(1,max(0,(150-l)/55)), min(1,max(0,(s-30)/50)))
        # halo gris residual a la izquierda/arriba/abajo del marco
        if s<40 and 70<l<190 and (x<240 or y<75 or y>H-45): a*=0.15
        ap[x,y]=int(a*255)
bin_=al.point(lambda v:0 if v<128 else 255)
pad=Image.new('L',(W+2,H+2),0); pad.paste(bin_,(1,1)); ImageDraw.floodfill(pad,(0,0),100)
pp=pad.crop((1,1,W+1,H+1)).load()
for y in range(H):
    for x in range(W):
        if pp[x,y]!=100: ap[x,y]=255
al=al.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1))
out=src.convert('RGBA'); out.putalpha(al)
out=out.crop(al.point(lambda v:255 if v>60 else 0).getbbox())
out=out.resize((1000,out.height*1000//out.width),Image.LANCZOS)
out.save(sys.argv[2],optimize=True)

# Mancha gris-rosada residual a la izquierda de la hoja roja: se borra por
# contigüidad desde un punto semilla, sin tocar la hoja (roja saturada).
def remove_blob(img, seed):
    p=img.load(); W,H=img.size; q=collections.deque([seed]); seen=set()
    def blob(c): r,g,b,a=c; return a>0 and (r+g+b)/3>70 and r-g<70
    while q:
        x,y=q.popleft()
        if (x,y) in seen or not (0<=x<W and 0<=y<H) or not blob(p[x,y]): continue
        seen.add((x,y)); r,g,b,a=p[x,y]; p[x,y]=(r,g,b,0)
        q.extend(((x+1,y),(x-1,y),(x,y+1),(x,y-1)))
    return len(seen)
img=Image.open(sys.argv[2]); print('blob px', remove_blob(img,(20,340))); img.save(sys.argv[2])
