"""empty message

Revision ID: 024b1723401a
Revises: 
Create Date: 2024-05-28 17:30:02.609440

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '024b1723401a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('availability',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('day', sa.String(length=120), nullable=False),
    sa.Column('hour', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('client',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=180), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('goals',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('kind', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=180), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('availability_client',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('availability_id', sa.Integer(), nullable=False),
    sa.Column('client_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['availability_id'], ['availability.id'], ),
    sa.ForeignKeyConstraint(['client_id'], ['client.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('availability_client')
    op.drop_table('user')
    op.drop_table('goals')
    op.drop_table('client')
    op.drop_table('availability')
    # ### end Alembic commands ###