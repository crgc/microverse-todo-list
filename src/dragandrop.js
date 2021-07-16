let dragElem = null;

function dragStart(e) 
{
  /* Set data */
  dragElem = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);

  console.log(this.innerHTML);
};

function dragOver(e) 
{
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
};

function drop(e) 
{
   e.preventDefault();

   console.log(this.innerHTML);
   
   /* Get data */
   dragElem.innerHTML = this.innerHTML;
   this.innerHTML = e.dataTransfer.getData('text/html');
};

export {
  dragStart,
  dragOver,
  drop
}